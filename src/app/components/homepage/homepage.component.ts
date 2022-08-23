import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import {
  Chuongtrinh,
  Enrollmentlist,
  User,
} from 'src/app/models/doanhoi.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';
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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  chuongtrinh?: Chuongtrinh[];
  ctNoibat?: Chuongtrinh[];
  ct?: Chuongtrinh[];
  enrollmentlist?: Enrollmentlist[];
  currentChuongtrinh?: Chuongtrinh;
  currentIndex = -1;
  title = '';
  screenHeight = 0;
  chuongtrinh2?: Array<Chuongtrinh> = [];
  screenWidth = 0;
  myModule = '';
  danhsachDk?: Chuongtrinh[];
  count1 = 9000;
  duration1 = 2000;
  count2 = 65;
  duration2 = 2000;
  count3 = 33;
  duration3 = 2000;
  currentChuongtrinhcheck?: Chuongtrinh;
  enrollmentlist2?: Enrollmentlist[];
  userid = localStorage.getItem('userid')?.replace(/"/g, '');

  constructor(private chuongtrinhService: ChuongtrinhService) {}

  ngOnInit(): void {
    this.retrieveDoanhoi();
    this.retrieveCTNoibat();
    this.sortBy();
  }
  refreshList(): void {
    this.currentChuongtrinh = undefined;
    this.currentIndex = -1;
    this.retrieveDoanhoi();
  }

  retrieveDoanhoi(): void {
    var today = new Date().getTime();
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.chuongtrinh = data.filter(
          (x) => new Date(x.timeend!).getTime() > today
        );
        for (let i = 0; i < this.chuongtrinh.length; i++) {
          this.chuongtrinh[i].eventname = this.chuongtrinh[
            i
          ].eventname?.replace(/=/g, '.');
          this.chuongtrinh2?.push(data[i]);
        }
        this.chuongtrinh2?.sort((a: any, b: any) => {
          return <any>new Date(a.ngayDangTai) - <any>new Date(b.ngayDangTai);
        });
      });
  }

  async retrieveCTNoibat() {
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.ctNoibat = data;
        for (let i = 0; i < this.ctNoibat!.length; i++) {
          this.chuongtrinhService
            .getdanhsachuserdadangky(this.ctNoibat![i])
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
            .subscribe((data) => {
              this.enrollmentlist = data;
              const da = {
                soluongdk: this.enrollmentlist.length,
              };
              this.chuongtrinhService.update2(this.ctNoibat![i].key!, da);
            });
        }
      });
  }
  ctmoi?: Chuongtrinh[];
  ctmoi2?: Chuongtrinh[];
  ctmoi3?: Array<Chuongtrinh> = [];

  sortBy(): void {
    var today = new Date().getTime();
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.ctmoi = data.filter((x) => new Date(x.timeend!).getTime() > today);
        this.ctmoi2 = this.ctmoi?.sort((a: any, b: any) =>
          a.soluongdk < b.soluongdk ? 1 : a.soluongdk > b.soluongdk ? -1 : 0
        );
        for (let i = 0; i < this.ctmoi2.length; i++) {
          this.ctmoi2[i].eventname = this.ctmoi2[i].eventname?.replace(
            /=/g,
            '.'
          );
        }
      });
  }

  setActiveDoanhoi(chuongtrinh: Chuongtrinh, index: number): void {
    var u: User = {
      key: this.userid,
    };
    this.chuongtrinhService
      .getdanhsachuserdadangky(chuongtrinh)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.enrollmentlist2 = data.filter((x) => x.key == u.key);
      });
    if (this.enrollmentlist2!.length > 0) {
      this.currentChuongtrinhcheck = chuongtrinh;
    } else this.currentChuongtrinh = chuongtrinh;
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
