import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { User, Dangkythamgia, Chuongtrinh } from 'src/app/models/doanhoi.model';
import { map } from 'rxjs/operators';
import {
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-lichsu-dangky',
  templateUrl: './lichsu-dangky.component.html',
  styleUrls: ['./lichsu-dangky.component.css'],
})
export class LichsuDangkyComponent implements OnInit {
  chuongtrinh?: Chuongtrinh[];
  selectChuongtrinhdadangky?: Dangkythamgia[];
  email = localStorage.getItem('email')?.replace(/"/g, '');
  password = localStorage.getItem('password')?.replace(/"/g, '');
  userid = localStorage.getItem('userid')?.replace(/"/g, '');
  studentcode = localStorage.getItem('studentcode')?.replace(/"/g, '');
  faculty = localStorage.getItem('faculty')?.replace(/"/g, '');
  fullname = localStorage.getItem('fullname')?.replace(/"/g, '');
  phonenumber = localStorage.getItem('phonenumber')?.replace(/"/g, '');
  gender = localStorage.getItem('gender')?.replace(/"/g, '');
  dateofbirth = localStorage.getItem('dateofbirth')?.replace(/"/g, '');
  currentUser: User = {
    phonenumber: this.phonenumber,
    gender: this.gender,
    dateofbirth: this.dateofbirth,
    key: this.userid,
  };
  dsquantam: Array<Chuongtrinh> = [];
  currentIndex = -1;
  currentChuongtrinh?: Chuongtrinh;
  ctmoi3: Array<Dangkythamgia> = [];
  ctmoi4: Array<Chuongtrinh> = [];
  ctmoi5: Array<Chuongtrinh> = [];
  ctmoi2?: Chuongtrinh[];

  constructor(
    private userService: UserService,
    private chuongtrinhService: ChuongtrinhService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.retrieveLichsudangky();
    this.retrieveDoanhoi();
    this.retrieveQuantam();
    // this.sortby();
  }

  retrieveDoanhoi(): void {
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.chuongtrinh = data;
        for (let i = 0; i < this.chuongtrinh.length; i++) {
          this.chuongtrinh[i].eventname = this.chuongtrinh[
            i
          ].eventname?.replace(/=/g, '.');
          this.ctmoi5?.push(data[i]);
        }
      });
  }
  chuongtrinhc?: Chuongtrinh;
  updateUser(): void {
    this.currentUser.key = this.userid;
    const data = {
      phonenumber: this.currentUser.phonenumber,
      gender: this.currentUser.gender,
      dateofbirth: this.currentUser.dateofbirth,
    };
    if (this.currentUser.key) {
      this.userService.update(this.currentUser.key, data);
      if (
        this.gender !== '' &&
        this.dateofbirth !== '' &&
        this.phonenumber !== ''
      ) {
        this.currentUser.phonenumber = this.phonenumber;
        this.currentUser.gender = this.gender;
        this.currentUser.dateofbirth = this.dateofbirth;
        localStorage.setItem('phonenumber', JSON.stringify(data.phonenumber));
        localStorage.setItem('gender', JSON.stringify(data.gender));
        localStorage.setItem('dateofbirth', JSON.stringify(data.dateofbirth));
      } else {
        localStorage.setItem(
          'phonenumber',
          JSON.stringify(this.currentUser.phonenumber)
        );
        localStorage.setItem('gender', JSON.stringify(this.currentUser.gender));
        localStorage.setItem(
          'dateofbirth',
          JSON.stringify(this.currentUser.dateofbirth)
        );
      }
    }
    this.openDialogok();
  }
  retrieveLichsudangky() {
    var u: User = {
      key: this.userid,
      email: this.email,
      password: this.password,
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
        for (let i = 0; i < this.selectChuongtrinhdadangky.length; i++) {
          this.selectChuongtrinhdadangky[i].eventname =
            this.selectChuongtrinhdadangky[i].eventname?.replace(/=/g, '.');
          this.ctmoi3?.push(data[i]);
        }
      });
    // this.sortby();
  }
  sortby(prop: string) {
    return this.ctmoi3?.sort((a: any, b: any) => {
      return <any>new Date(a[prop]) - <any>new Date(b[prop]);
    });
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
    this.router.navigate(['/homepage']);
  }
  retrieveQuantam(): void {
    var today = new Date().getTime();
    var u: User = {
      key: this.userid,
    };
    this.userService
      .getdsctquantam(u)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.dsquantam = data;
        this.dsquantam = this.dsquantam.filter(
          (x) => new Date(x.timeend!).getTime() > today
        );
        for (let i = 0; i < this.dsquantam.length; i++) {
          this.dsquantam[i].eventname = this.dsquantam[i].eventname?.replace(
            /=/g,
            '.'
          );
          this.ctmoi4?.push(data[i]);
        }
      });
  }
  minus(x: string) {
    var timeend = new Date(x).getTime();
    var today = new Date().getTime();
    var distance = timeend - today;
    var second = distance / 1000;
    return second;
  }
  openDialogok() {
    this.dialog.open(DialogOverviewExampleDialog1);
  }

  config: CountdownConfig = {
    leftTime: 60 * 60 * 25,
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);
      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(
            new RegExp(`${name}+`, 'g'),
            (match: string) => {
              return v.toString().padStart(match.length, '0');
            }
          );
        }
        return current;
      }, formatStr);
    },
  };
}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
    <div class="text-center">
      <i class="far fa-solid fa-circle-check fa-3x"></i>
    </div>
    <h2 class="text-center" mat-dialog-title>Chúc mừng!</h2>
    <div class="text-center" mat-dialog-content>
      Bạn đã cập nhật thành công.
    </div>
  </div> `,
  styleUrls: ['./lichsu-dangky.component.css'],
})
export class DialogOverviewExampleDialog1 {}
