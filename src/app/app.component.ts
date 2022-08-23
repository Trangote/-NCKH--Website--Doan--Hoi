import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/models/doanhoi.model';
import { UserService } from 'src/app/services/user.service';
import { Chuongtrinh, Btc } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'websiteDoanHoi';
  isNavbarCollapsed = true;
  currentIndex = -1;
  @Input() user?: User;
  @Input() btc?: Btc;
  currentUser: User = {
    email: '',
    password: '',
    phonenumber: '',
    studentcode: '',
    fullname: '',
    faculty: '',
    khoa: '',
    paymentimage: '',
    checkinstatus: false,
    checkintime: '',
  };
  currentBtc: Btc = {
    btcname: '',
    btcemail: '',
    btcid: '',
    password: '',
    btcimages: '',
    fanpagelink: '',
  };
  typeuser?: string;

  emailuser?: string;
  useruser: User = {
    email: '',
  };
  usermang?: Array<User> = [];
  email = localStorage.getItem('email')?.replace(/"/g, '');
  constructor(
    private userService: UserService,
    private chuongtrinhService: ChuongtrinhService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.getuser();
  }
  ngOnChanges(): void {
    this.currentUser = { ...this.user };
  }
  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
  phanquyenUser() {
    var btcid = localStorage.getItem('btcid')?.replace(/"/g, '');
    var userid = localStorage.getItem('userid')?.replace(/"/g, '');
    if (userid !== '' && userid !== undefined) {
      this.router.navigate(['/taikhoanuser']);
    } else if (btcid !== '' && btcid !== undefined) {
      this.router.navigate(['/chuongtrinhlist']);
    } else {
      this.openDialog();
    }
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
  getuser() {
    if (this.email != '' && this.email != undefined) {
      // this.userService
      //   .getAll()
      //   .snapshotChanges()
      //   .pipe(
      //     map((changes) =>
      //       changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      //     )
      //   )
      //   .subscribe((data) => {
      //     this.usermang = data.filter((x) => x.email == this.email);
      //     this.useruser = this.usermang[0];
      //   });
      this.useruser.email = this.email;
    } else {
      // this.useruser!.email = '';
      this.useruser.email = '';
    }
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
      <div class="text-center">
        <i class="far fa-solid fa-circle-info fa-3x"></i>
      </div>
      <h2 class="text-center" mat-dialog-title>Chưa đăng nhập!</h2>
      <div class="text-center" mat-dialog-content>
        Bạn chưa đăng nhập, vui lòng đăng nhập tài khoản.
      </div>
    </div>
    <div class="text-center">
      <button type="button" class=" btn btn-light" (click)="dangnhap()">
        Đăng nhập
      </button>
    </div> `,
  styleUrls: ['./app.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    private router1: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) {}
  dangnhap(): void {
    this.router1.navigate(['/dangnhap']);
    setTimeout(() => {
      this.dialogRef.close();
    }, 10);
  }
}
