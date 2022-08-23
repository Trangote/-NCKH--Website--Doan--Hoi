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
import {
  Chuongtrinh,
  Dangkythamgia,
  Enrollmentlist,
} from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dangky-canhan',
  templateUrl: './dangky-canhan.component.html',
  styleUrls: ['./dangky-canhan.component.css'],
})
export class DangkyCanhanComponent implements OnInit {
  submitted = false;
  selectChuongtrinhdadangky?: Dangkythamgia[];
  message = '';
  @Input() dangkythamgia?: Chuongtrinh;
  @Input() enrollmentlist?: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentChuongtrinh1: Chuongtrinh = {
    key: '',
  };
  currentDangky: Dangkythamgia = {
    eventid: '',
    checkinstatus: false,
    checkintime: '',
    ngayDangTai: 0,
    timeend: '',
    eventname: '',
    ngayDangKy: '',
  };
  currentDanhsach: Enrollmentlist = {
    userid: '',
    checkinstatus: false,
    checkintime: '',
    imgpayment: '',
    faculty: '',
    khoa: '',
    fullname: '',
    studentcode: '',
    phonenumber: '',
  };
  email = localStorage.getItem('email')?.replace(/"/g, '');
  password = localStorage.getItem('password')?.replace(/"/g, '');
  userid = localStorage.getItem('userid')?.replace(/"/g, '');
  faculty = localStorage.getItem('faculty')?.replace(/"/g, '');
  khoa = localStorage.getItem('khoa')?.replace(/"/g, '');
  fullname = localStorage.getItem('fullname')?.replace(/"/g, '');
  studentcode = localStorage.getItem('studentcode')?.replace(/"/g, '');
  getchuongtrinh?: Array<Chuongtrinh> = [];
  chuongtrinhgetduoc?: Chuongtrinh | any;
  constructor(
    private userService: UserService,
    private chuongtrinhService: ChuongtrinhService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.retrieveChuongtrinh();
    this.retrieveCTDaDangKy();
  }
  ngOnChanges(): void {
    this.currentDangky = { ...this.dangkythamgia };
    this.currentDanhsach = { ...this.enrollmentlist };
  }

  retrieveCTDaDangKy() {
    var email = localStorage.getItem('email')?.replace(/"/g, '');
    var password = localStorage.getItem('password')?.replace(/"/g, '');
    var userid = localStorage.getItem('userid')?.replace(/"/g, '');
    var u: User = {
      key: userid,
      email: email,
      password: password,
    };
    this.userService
      .getdanhsachctdadangky(u)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.selectChuongtrinhdadangky = data;
        return data;
      });
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  openDialog1() {
    this.dialog.open(DialogElementsExampleDialog1);
  }

  retrieveChuongtrinh() {
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        var routeParams = this.route.snapshot.paramMap;
        var productIdFromRoute = routeParams.get('key');
        this.getchuongtrinh = [];
        this.chuongtrinhgetduoc = data.filter(
          (x) => x.key == productIdFromRoute
        );
        this.getchuongtrinh?.push(this.chuongtrinhgetduoc);
      });
  }

  danhsachChuongtrinhThamgia(): void {
    var email = localStorage.getItem('email')?.replace(/"/g, '');
    var password = localStorage.getItem('password')?.replace(/"/g, '');
    var userid = localStorage.getItem('userid')?.replace(/"/g, '');
    var faculty = localStorage.getItem('faculty')?.replace(/"/g, '');
    var khoa = localStorage.getItem('khoa')?.replace(/"/g, '');
    var today = new Date().getTime();
    if (
      email == '' ||
      password == '' ||
      email == undefined ||
      password == undefined
    ) {
      this.openDialog1();
    } else {
      var u: User = {
        key: userid,
        email: email,
        password: password,
      };
      var a = 0;
      this.retrieveCTDaDangKy();
      if (this.selectChuongtrinhdadangky!.length == 0) {
        for (let i = 0; i < this.chuongtrinhgetduoc?.length; i++) {
          this.currentDangky.eventid = this.chuongtrinhgetduoc[i].key;
          this.currentDangky.checkintime = '';
          this.currentDangky.checkinstatus = false;
          this.currentDangky.ngayDangTai =
            this.chuongtrinhgetduoc[i].ngayDangTai;
          this.currentDangky.timeend = this.chuongtrinhgetduoc[i].timeend;
          this.currentDangky.eventname = this.chuongtrinhgetduoc[i].eventname;
          this.currentDangky.ngayDangKy = today.toString();
          this.userService.dangkythamgia(u, this.currentDangky);
          this.currentDanhsach.userid = userid;
          this.currentDanhsach.email = email;
          this.currentDanhsach.faculty = faculty;
          this.currentDanhsach.khoa = khoa;
          this.currentDanhsach.checkinstatus = false;
          this.currentDanhsach.checkintime = '';
          this.currentDanhsach.imgpayment = '';
          this.currentDanhsach.fullname = this.fullname;
          this.currentDanhsach.studentcode = this.studentcode;
          this.chuongtrinhService.enrollmentlist(
            this.chuongtrinhgetduoc[i],
            this.currentDanhsach
          );
        }
      } else {
        for (let i = 0; i < this.selectChuongtrinhdadangky!.length; i++) {
          if (
            this.selectChuongtrinhdadangky![i].eventid ==
            this.chuongtrinhgetduoc[0].key
          ) {
            a += 1;
            break;
          }
        }
        if (a > 0) {
          // alert("Đăng ký quài!!!")
          this.openDialogRoi();
        } else {
          for (let i = 0; i < this.chuongtrinhgetduoc?.length; i++) {
            this.currentDangky.eventid = this.chuongtrinhgetduoc[i].key;
            this.currentDangky.checkintime = '';
            this.currentDangky.checkinstatus = false;
            this.currentDangky.ngayDangTai =
              this.chuongtrinhgetduoc[i].ngayDangTai;
            this.currentDangky.timeend = this.chuongtrinhgetduoc[i].timeend;
            this.currentDangky.eventname = this.chuongtrinhgetduoc[i].eventname;
            this.currentDangky.ngayDangKy = today.toString();
            this.userService.dangkythamgia(u, this.currentDangky);
            this.currentDanhsach.userid = userid;
            this.currentDanhsach.checkinstatus = false;
            this.currentDanhsach.faculty = faculty;
            this.currentDanhsach.khoa = khoa;
            this.currentDanhsach.email = email;
            this.currentDanhsach.checkintime = '';
            this.currentDanhsach.imgpayment = '';
            this.currentDanhsach.fullname = this.fullname;
            this.currentDanhsach.studentcode = this.studentcode;
            this.chuongtrinhService.enrollmentlist(
              this.chuongtrinhgetduoc[i],
              this.currentDanhsach
            );
            this.openDialog();
          }
        }
      }
    }
  }
  openDialogRoi() {
    this.dialog.open(DialogElementsExampleDialogRoi);
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
    <div class="text-center">
      <i class="far fa-solid fa-circle-xmark fa-3x"></i>
    </div>
    <h2 class="text-center" mat-dialog-title>Thất bại!</h2>
    <div class="text-center" mat-dialog-content>
      Bạn đã đăng ký chương trình này rồi.
    </div>
  </div>`,
  styleUrls: ['./dangky-canhan.component.css'],
})
export class DialogElementsExampleDialogRoi {}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
      <div class="text-center">
        <i class="far fa-solid fa-circle-check fa-3x"></i>
      </div>
      <h2 class="text-center" mat-dialog-title>Chúc mừng!</h2>
      <div class="text-center" mat-dialog-content>
        Bạn đã đăng ký thành công.
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-light" (click)="chuyentrang()">
        OK
      </button>
    </div> `,
  styleUrls: ['./dangky-canhan.component.css'],
})
export class DialogElementsExampleDialog {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>
  ) {}
  chuyentrang(): void {
    this.router.navigate(['/homepage']);
    setTimeout(() => {
      this.dialogRef.close();
    }, 10);
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
  styleUrls: ['./dangky-canhan.component.css'],
})
export class DialogElementsExampleDialog1 {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogElementsExampleDialog1>
  ) {}
  dangnhap(): void {
    this.router.navigate(['/dangnhap']);
    setTimeout(() => {
      this.dialogRef.close();
    }, 10);
  }
}
