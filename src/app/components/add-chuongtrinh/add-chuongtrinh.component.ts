import { Component, OnInit } from '@angular/core';
import { Chuongtrinh, Btc } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { BtcService } from 'src/app/services/btc.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-chuongtrinh',
  templateUrl: './add-chuongtrinh.component.html',
  styleUrls: ['./add-chuongtrinh.component.css'],
})
export class AddChuongtrinhComponent implements OnInit {
  submitted = false;
  form: FormGroup = new FormGroup({
    eventname: new FormControl(''),
    eventtype: new FormControl(''),
    scale: new FormControl(''),
    timeend: new FormControl(''),
    timestart: new FormControl(''),
    description: new FormControl(''),
    shortdescription: new FormControl(''),
    timeline: new FormControl(''),
    benefit: new FormControl(''),
    banner: new FormControl(''),
    imgavatar: new FormControl(''),
    fee: new FormControl(''),
    sknow: new FormControl(''),
    sconnect: new FormControl(''),
    screative: new FormControl(''),
    straining: new FormControl(''),
    sskill: new FormControl(''),
    img1gioithieu: new FormControl(''),
    img2benefit: new FormControl(''),
    img3timeline: new FormControl(''),
    quyenloiopt: new FormControl(''),
    cert: new FormControl(''),
    soluongdk: new FormControl(0),
    ngayDangTai: new FormControl(0),
    btcid: new FormControl(''),
    btcname: new FormControl(''),
  });
  btc1?: Btc[];
  btcn?: Btc;
  selectLoai: Array<string> = ['Học thuật', 'Xã hội', 'Tình nguyện'];
  selectQuymo: Array<string> = ['Cấp khoa', 'Cấp trường'];
  selectQuyenloi: Array<string> = [
    'Ngày công tác xã hội',
    'Điểm rèn luyện',
    'Giải thưởng',
  ];
  selectedItems = [];
  dropdownSettings = {};
  btcmatch?: Btc;
  chuongtrinh: Chuongtrinh = new Chuongtrinh();
  btcid = localStorage.getItem('btcid')?.replace(/"/g, '');
  password = localStorage.getItem('btcpassword')?.replace(/"/g, '');
  btcname = localStorage.getItem('btcname')?.replace(/"/g, '');
  btcimages = localStorage.getItem('btcimages')?.replace(/"/g, '');
  btcemail = localStorage.getItem('btcemail')?.replace(/"/g, '');
  fanpagelink = localStorage.getItem('fanpagelink')?.replace(/"/g, '');
  btc: Btc = {
    btcid: this.btcid,
    password: this.password,
    btcname: this.btcname,
    btcimages: this.btcimages,
    btcemail: this.btcemail,
    fanpagelink: this.fanpagelink,
  };
  today: number = Date.now();
  constructor(
    private chuongtrinhService: ChuongtrinhService,
    private btcService: BtcService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      eventname: ['', [Validators.required]],
      eventtype: ['', Validators.required],
      scale: ['', Validators.required],
      benefit: ['', [Validators.required, Validators.minLength(6)]],
      timestart: ['', Validators.required],
      timeend: ['', Validators.required],
      imgavatar: ['', Validators.required],
      banner: ['', Validators.required],
      shortdescription: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(500),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(6)]],
      fee: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(9)],
      ],
      timeline: ['', [Validators.required, Validators.minLength(6)]],
      sknow: ['', Validators.required],
      sconnect: ['', Validators.required],
      screative: ['', Validators.required],
      straining: ['', Validators.required],
      sskill: ['', Validators.required],
      img1gioithieu: ['', Validators.required],
      img2benefit: ['', Validators.required],
      img3timeline: ['', Validators.required],
      quyenloiopt: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.form.value.cert = '';
      this.form.value.soluongdk = 0;
      this.form.value.ngayDangTai = this.today;
      this.form.value.btcid = this.btcid;
      this.form.value.btcname = this.btcname;
      this.form.value.btcimages = this.btcimages;
      this.form.value.eventname = this.form.value.eventname.replace(/\./g, '=');
      this.chuongtrinhService.create(this.form.value).then(() => {});
      this.btcService.taoChuongtrinh(this.btc, this.form.value).then(() => {});
      this.openDialogok();
    }
  }
  dangxuat() {
    localStorage.setItem('btcemail', '');
    localStorage.setItem('btcpassword', '');
    localStorage.setItem('btcid', '');
    localStorage.setItem('btcimages', '');
    localStorage.setItem('btcname', '');
    localStorage.setItem('fanpagelink', '');
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
  }
  themchuongtrinh() {
    this.router.navigate(['/chuongtrinh']);
  }
  lichsudangtai() {
    this.router.navigate(['/chuongtrinhlist']);
  }
  newChuongtrinh(): void {
    this.submitted = false;
    this.chuongtrinh = new Chuongtrinh();
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  openDialogok() {
    this.dialog.open(DialogOverviewExampleDialog1);
  }
}
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
  styleUrls: ['./add-chuongtrinh.component.css'],
})
export class DialogElementsExampleDialog {}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
      <div class="text-center">
        <i class="far fa-solid fa-circle-check fa-3x"></i>
      </div>
      <h2 class="text-center" mat-dialog-title>Chúc mừng!</h2>
      <div class="text-center" mat-dialog-content>
        Bạn đã thêm chương trình thành công.
      </div>
    </div>
    <div class="text-center">
      <button type="button" class=" btn btn-light" (click)="chuyenhuong()">
        OK
      </button>
    </div> `,
  styleUrls: ['./add-chuongtrinh.component.css'],
})
export class DialogOverviewExampleDialog1 {
  constructor(
    private router1: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>
  ) {}
  chuyenhuong(): void {
    this.router1.navigate(['/chuongtrinhlist']);
    setTimeout(() => {
      this.dialogRef.close();
    }, 10);
  }
}
