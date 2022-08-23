import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { BtcService } from 'src/app/services/btc.service';
import { User, Btc } from 'src/app/models/doanhoi.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css'],
})
export class DangnhapComponent implements OnInit {
  user?: User[];
  password = document.getElementById('password') as HTMLElement;
  email = document.getElementById('email') as HTMLElement;
  submitted: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private btcService: BtcService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  onSubmit(e?: any, p?: any): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.userService
        .getAll()
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
          )
        )
        .subscribe((data) => {
          var check = data.filter(
            (x) => x.email == e.value && x.password == Md5.hashStr(p.value)
          );
          if (check.length > 0) {
            let u = check[0];
            localStorage.setItem('btcemail', '');
            localStorage.setItem('btcpassword', '');
            localStorage.setItem('btcid', '');
            localStorage.setItem('btcimages', '');
            localStorage.setItem('btcname', '');
            localStorage.setItem('fanpagelink', '');
            localStorage.setItem('email', u.email!);
            localStorage.setItem('password', u.password!);
            localStorage.setItem('fullname', u.fullname!);
            localStorage.setItem('faculty', u.faculty!);
            localStorage.setItem('studentcode', u.studentcode!);
            localStorage.setItem('khoa', u.khoa!);
            localStorage.setItem('userid', u.key!);
            if (
              u.phonenumber == undefined ||
              u.gender == undefined ||
              u.dateofbirth == undefined
            ) {
              localStorage.setItem('phonenumber', '');
              localStorage.setItem('gender', '');
              localStorage.setItem('dateofbirth', '');
            } else {
              localStorage.setItem('phonenumber', u.phonenumber!);
              localStorage.setItem('gender', u.gender!);
              localStorage.setItem('dateofbirth', u.dateofbirth!);
            }

            this.router.navigate(['/homepage']);
          } else {
            this.btcService
              .getAll()
              .snapshotChanges()
              .pipe(
                map((changes) =>
                  changes.map((c) => ({
                    key: c.payload.key,
                    ...c.payload.val(),
                  }))
                )
              )
              .subscribe((data) => {
                var check = data.filter(
                  (x) =>
                    x.btcemail == e.value && x.password == Md5.hashStr(p.value)
                );
                if (check.length > 0) {
                  localStorage.setItem('btcemail', e.value);
                  localStorage.setItem('btcpassword', Md5.hashStr(p.value));
                  let u = check[0];
                  localStorage.setItem('btcid', u.btcid!);
                  localStorage.setItem('btcimages', u.btcimages!);
                  localStorage.setItem('btcname', u.btcname!);
                  localStorage.setItem('fanpagelink', u.fanpagelink!);
                  localStorage.setItem('email', '');
                  localStorage.setItem('password', '');
                  localStorage.setItem('fullname', '');
                  localStorage.setItem('faculty', '');
                  localStorage.setItem('studentcode', '');
                  localStorage.setItem('khoa', '');
                  localStorage.setItem('userid', '');
                  localStorage.setItem('phonenumber', '');
                  localStorage.setItem('gender', '');
                  localStorage.setItem('dateofbirth', '');
                  this.router.navigate(['/homepage']);
                } else {
                  this.openDialog();
                }
              });
          }
        });
    }
  }
  taotaikhoan() {
    this.router.navigate(['/user']);
  }
  openDialog1() {
    this.dialog.open(DialogElementsExampleDialog1);
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
    <div class="text-center">
      <i class="fa-solid fa-circle-xmark fa-3x"></i>
    </div>
    <h2 class="text-center" mat-dialog-title>Thất bại!</h2>
    <div class="text-center" mat-dialog-content>Vui lòng thử lại.</div>
  </div>`,
  styleUrls: ['./dangnhap.component.css'],
})
export class DialogElementsExampleDialog {}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
    <div class="text-center">
      <i class="far fa-solid fa-circle-info fa-3x"></i>
    </div>
    <h2 class="text-center" mat-dialog-title>Coming soon...</h2>
    <div class="text-center" mat-dialog-content>
      Tính năng này chưa được hỗ trợ.
    </div>
  </div>`,
  styleUrls: ['./dangnhap.component.css'],
})
export class DialogElementsExampleDialog1 {}
