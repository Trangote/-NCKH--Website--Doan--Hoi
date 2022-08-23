import { Component, OnInit } from '@angular/core';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import {
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';
import {
  Chuongtrinh,
  User,
  Enrollmentlist,
  Dangkythamgia,
} from 'src/app/models/doanhoi.model';
const CountdownTimeUnits: Array<[string, number]> = [
  ['Y1', 1000 * 60 * 60 * 24 * 365], // years
  ['M1', 1000 * 60 * 60 * 24 * 30], // months
  ['D1', 1000 * 60 * 60 * 24], // days
  ['H1', 1000 * 60 * 60], // hours
  ['m1', 1000 * 60], // minutes
  ['s1', 1000], // seconds
  ['S1', 1], // million seconds
];

@Component({
  selector: 'app-ct-goiy',
  templateUrl: './ct-goiy.component.html',
  styleUrls: ['./ct-goiy.component.css'],
})
export class CtGoiyComponent implements OnInit {
  chuongtrinh: Array<Chuongtrinh> = [];
  currentChuongtrinh?: Chuongtrinh;
  currentIndex = -1;
  userid = localStorage.getItem('userid')?.replace(/"/g, '');
  enrollmentlist2?: Enrollmentlist[];
  danhsachct?: Dangkythamgia[];
  currentChuongtrinhcheck?: Chuongtrinh;
  chuongtrinh1?: Chuongtrinh[];
  reload = false;
  constructor(
    public chuongtrinhService: ChuongtrinhService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.retrieveCTdexuat();
  }
  retrieveCTdexuat() {
    var u: User = {
      key: this.userid,
    };
    this.userService
      .getdanhsachctdadangky(u)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data1) => {
        this.danhsachct = data1;
        this.chuongtrinhService
          .getAll()
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .subscribe((data) => {
            this.chuongtrinh1 = data;
            for (let i = 0; i < this.chuongtrinh1!.length; i++) {
              this.chuongtrinh1[i].eventname = this.chuongtrinh1[
                i
              ].eventname?.replace(/=/g, '.');
              if (
                this.danhsachct!.filter(
                  (x) => x.eventid == this.chuongtrinh1![i].key
                ).length == 1
              ) {
              } else {
                this.chuongtrinh?.push(this.chuongtrinh1![i]);
              }
            }
          });
      });
  }
  minus(x: string) {
    var timeend = new Date(x).getTime();
    var today = new Date().getTime();
    var distance = timeend - today;
    var second = distance / 1000;
    return second;
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
