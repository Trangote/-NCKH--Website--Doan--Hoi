import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/doanhoi.model';
import { UserService } from 'src/app/services/user.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import Validation from 'src/app/shared/services/user';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
// import { AbstractControl, ValidatorFn } from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  @Input() pattern?: string | RegExp;
  md5 = new Md5();
  user: User = new User();
  submitted = false;
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    studentcode: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    khoa: new FormControl(''),
    faculty: new FormControl(''),
  });
  submitform: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              '^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW|_]{1,}(?: [a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW|_]+){0,8}$'
            ),
          ]),
        ],
        khoa: ['', Validators.required],
        faculty: ['', Validators.required],
        studentcode: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.form.value.password = Md5.hashStr(this.form.value.password);
      this.form.value.confirmPassword = Md5.hashStr(
        this.form.value.confirmPassword
      );
      this.userService.create(this.form.value);
      this.openDialogok();
    }
  }
  newDoanhoi(): void {
    this.submitted = false;
    this.user = new User();
  }
  openDialogok() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
      <div class="text-center">
        <i class="far fa-solid fa-circle-check fa-3x"></i>
      </div>
      <h2 class="text-center" mat-dialog-title>Chúc mừng!</h2>
      <div class="text-center" mat-dialog-content>
        Bạn đã đăng ký tài khoản thành công.
      </div>
    </div>
    <div class="text-center">
      <button type="button" class=" btn btn-light" (click)="chuyenhuong()">
        OK
      </button>
    </div> `,
  styleUrls: ['./add-user.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    private router1: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) {}
  chuyenhuong(): void {
    this.router1.navigate(['/dangnhap']);
    setTimeout(() => {
      this.dialogRef.close();
    }, 10);
  }
}
