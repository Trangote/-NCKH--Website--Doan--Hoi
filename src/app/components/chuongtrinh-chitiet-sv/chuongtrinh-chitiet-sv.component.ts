import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {
  Btc,
  Chuongtrinh,
  Dangkythamgia,
  Enrollmentlist,
} from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { User, Thongbao } from 'src/app/models/doanhoi.model';
import { UserService } from 'src/app/services/user.service';
import { CountdownConfig } from 'ngx-countdown';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BtcService } from 'src/app/services/btc.service';

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
  selector: 'app-chuongtrinh-chitiet-sv',
  templateUrl: './chuongtrinh-chitiet-sv.component.html',
  styleUrls: ['./chuongtrinh-chitiet-sv.component.css'],
})
export class ChuongtrinhChitietSvComponent implements OnInit {
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  btc1?: Btc[];
  btc2?: Btc;
  btc3?: Btc[];
  btc4?: Btc;
  currentIndex = -1;
  tb?: Thongbao[];
  userid = localStorage.getItem('userid')?.replace(/"/g, '');
  ctFilter?: Chuongtrinh[];
  email = localStorage.getItem('email')?.replace(/"/g, '');
  password = localStorage.getItem('password')?.replace(/"/g, '');
  quantam = false;
  message = '';
  dsquantam?: Chuongtrinh[];
  iff = false;
  eventname?: string;
  getchuongtrinh?: Array<Chuongtrinh> = [];
  chuongtrinhgetduoc?: Chuongtrinh | any;
  enrollmentlist2?: Enrollmentlist[];
  chuongtrinhgetduoc2?: Chuongtrinh;
  chuongtrinhgetduoc3?: Chuongtrinh;
  tb2?: Array<Thongbao> = [];
  private sub: any;

  constructor(
    private chuongtrinhService: ChuongtrinhService,
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private btcService: BtcService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      let key = params['key'];
      this.retrieveChuongtrinh(key);
    });
    this.getQuantam();
  }
  ngOnChanges() {}

  cttest: Array<Chuongtrinh> = [];

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  retrieveChuongtrinh(key: string) {
    var u: User = {
      key: this.userid,
    };
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        var productIdFromRoute = key;
        this.chuongtrinhgetduoc = data.filter(
          (x) => x.key == productIdFromRoute
        );
        for (let i = 0; i < this.chuongtrinhgetduoc.length; i++) {
          this.chuongtrinhService
            .getdanhsachuserdadangky(this.chuongtrinhgetduoc[i])
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
            .subscribe((data1) => {
              this.enrollmentlist2 = data1.filter((x) => x.key == u.key);
              if (this.enrollmentlist2!.length > 0) {
                this.chuongtrinhgetduoc2 = this.chuongtrinhgetduoc[i];
                this.chuongtrinhgetduoc2!.description =
                  this.chuongtrinhgetduoc2!.description?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc2!.benefit =
                  this.chuongtrinhgetduoc2!.benefit?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc2!.timeline =
                  this.chuongtrinhgetduoc2!.timeline?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc2!.shortdescription =
                  this.chuongtrinhgetduoc2!.shortdescription?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc2!.eventname =
                  this.chuongtrinhgetduoc2!.eventname?.replace(/=/g, '.');
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
                  .subscribe((data3) => {
                    this.btc3 = data3.filter(
                      (x) => x.btcid == this.chuongtrinhgetduoc2!.btcid
                    );
                    this.btc4 = this.btc3[0];
                  });
                this.chuongtrinhService
                  .danhsachthongbao(this.chuongtrinhgetduoc[i])
                  .snapshotChanges()
                  .pipe(
                    map((changes) =>
                      changes.map((c) => ({
                        key: c.payload.key,
                        ...c.payload.val(),
                      }))
                    )
                  )
                  .subscribe((data2) => {
                    this.tb = data2;
                    this.tb2 = [];
                    for (let i = 0; i < this.tb.length; i++) {
                      this.tb[i].thongbao = this.tb[i].thongbao?.replace(
                        /(?:\r\n|\r|\n)/g,
                        '<br>'
                      );
                      this.tb2?.push(this.tb[i]);
                    }
                  });
              } else {
                this.chuongtrinhgetduoc3 = this.chuongtrinhgetduoc[i];
                this.chuongtrinhgetduoc3!.description =
                  this.chuongtrinhgetduoc3!.description?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc3!.benefit =
                  this.chuongtrinhgetduoc3!.benefit?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc3!.timeline =
                  this.chuongtrinhgetduoc3!.timeline?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc3!.shortdescription =
                  this.chuongtrinhgetduoc3!.shortdescription?.replace(
                    /(?:\r\n|\r|\n)/g,
                    '<br>'
                  );
                this.chuongtrinhgetduoc3!.eventname =
                  this.chuongtrinhgetduoc3!.eventname?.replace(/=/g, '.');
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
                  .subscribe((data4) => {
                    this.btc1 = data4.filter(
                      (x) => x.btcid == this.chuongtrinhgetduoc3!.btcid
                    );
                    this.btc2 = this.btc1[0];
                  });
              }
            });
        }
      });
  }
  getQuantam(): void {
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
        for (let i = 0; i < this.chuongtrinhgetduoc.length; i++) {
          this.dsquantam = data.filter(
            (x) => x.key == this.chuongtrinhgetduoc[i].key
          );
          if (this.dsquantam.length == 1) {
            this.iff = true;
          } else {
            this.iff = false;
          }
        }
      });
  }

  chuongtrinhquantam(a: Chuongtrinh) {
    var u: User = {
      key: this.userid,
    };
    if (u.key !== '' && u.key !== undefined) {
      this.quantam = !this.quantam;
      if (this.quantam) {
        this.userService.chuongtrinhquantam(u, a);
      } else {
        this.userService.xoachuongtrinhquantam(u, a.key!);
      }
    } else {
      this.openDialog();
    }
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
  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
  openDialog1() {
    this.dialog.open(DialogOverviewExampleDialog1);
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
  styleUrls: ['./chuongtrinh-chitiet-sv.component.css'],
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
  styleUrls: ['./chuongtrinh-chitiet-sv.component.css'],
})
export class DialogOverviewExampleDialog1 {}
