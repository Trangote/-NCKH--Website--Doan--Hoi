import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { Chuongtrinh, Btc } from 'src/app/models/doanhoi.model';
import { map } from 'rxjs/operators';
import {
  User,
  Dangkythamgia,
  Enrollmentlist,
} from 'src/app/models/doanhoi.model';
import { UserService } from 'src/app/services/user.service';
import { BtcService } from 'src/app/services/btc.service';
import {
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';
import { Router } from '@angular/router';

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
  selector: 'app-danhsach-ct-sv',
  templateUrl: './danhsach-ct-sv.component.html',
  styleUrls: ['./danhsach-ct-sv.component.css'],
})
export class DanhsachCtSvComponent implements OnInit {
  selectLoai: Array<string> = ['Học thuật', 'Xã hội', 'Tình nguyện'];
  selectedLoai?: any;
  selectQuymo: Array<string> = ['Cấp khoa', 'Cấp trường'];
  selectedQuymo?: any;
  selectQuyenloi: Array<string> = [
    'Ngày công tác xã hội',
    'Điểm rèn luyện',
    'Giải thưởng',
  ];
  selectedQuyenloi?: any;
  selectSapxep: Array<string> = [
    'Hạn đăng ký: Xa nhất',
    'Hạn đăng ký: Gần nhất',
  ];
  selectedSapxep?: any;
  selectBtc?: Btc[];
  selectChuongtrinhdadangky?: Dangkythamgia[];
  selectedBtc?: any;
  ctDaDangkyList?: Chuongtrinh[];
  searchText?: string;
  currentDate: Date = new Date();
  submitted = false;
  chuongtrinh2?: Array<Chuongtrinh> = [];
  @Input() dangkythamgia?: Chuongtrinh;
  @Input() enrollmentlist?: User;
  @Output() refreshList1: EventEmitter<any> = new EventEmitter();
  hientaiChuongtrinh?: Chuongtrinh;
  currentIndex = -1;
  currentDangky: Dangkythamgia = {
    eventid: '',
    checkinstatus: false,
    checkintime: '',
  };
  currentDanhsach: Enrollmentlist = {
    userid: '',
    checkinstatus: false,
    checkintime: '',
    imgpayment: '',
    faculty: '',
    khoa: '',
  };
  chuongtrinh?: Array<Chuongtrinh> = [];
  currentChuongtrinh?: Chuongtrinh;
  currentChuongtrinhcheck?: Chuongtrinh;
  currentCt: Chuongtrinh = {
    trangthai: '',
  };
  quantam = false;
  dsquantam?: Chuongtrinh[];
  dsquantam1?: Chuongtrinh[];
  userid = localStorage.getItem('userid')?.replace(/"/g, '');
  ctFilter?: Chuongtrinh[];
  email = localStorage.getItem('email')?.replace(/"/g, '');
  password = localStorage.getItem('password')?.replace(/"/g, '');
  enrollmentlist2?: Enrollmentlist[];
  chuongtrinhq?: Chuongtrinh[];
  iff = false;
  constructor(
    private chuongtrinhService: ChuongtrinhService,
    private userService: UserService,
    private btcService: BtcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveDoanhoi();
    this.retrieveBtc();
  }
  ngOnChanges(): void {
    this.currentDangky = { ...this.dangkythamgia };
    this.currentDanhsach = { ...this.enrollmentlist };
  }
  setActiveChuongtrinh(chuongtrinh: Chuongtrinh, index: number): void {
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

  refreshList(): void {
    this.hientaiChuongtrinh = undefined;
    this.currentChuongtrinh = undefined;
    this.currentIndex = -1;
    this.retrieveDoanhoi();
    this.iff = false;
    this.selectedLoai = '';
    this.selectedQuymo = '';
    this.selectedQuyenloi = '';
    this.selectedBtc = '';
  }
  retrieveBtc(): void {
    this.btcService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.selectBtc = data;
      });
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
        this.chuongtrinh2 = [];
        this.chuongtrinh = data.filter(
          (x) => new Date(x.timeend!).getTime() > today
        );
        for (let i = 0; i < this.chuongtrinh.length; i++) {
          this.chuongtrinh[i].eventname = this.chuongtrinh[
            i
          ].eventname?.replace(/=/g, '.');
          this.chuongtrinh2?.push(data[i]);
        }
      });
  }

  sortBy(item: any) {
    if (item == 'Hạn đăng ký: Xa nhất') {
      return this.chuongtrinh2?.sort((a: any, b: any) => {
        return <any>new Date(b.timeend) - <any>new Date(a.timeend);
      });
    } else {
      return this.chuongtrinh2?.sort((a: any, b: any) => {
        return <any>new Date(a.timeend) - <any>new Date(b.timeend);
      });
    }
  }

  applyFilter(
    selectedLoai?: any,
    selectedQuymo?: any,
    selectedQuyenloi?: any,
    selectedBtc?: string
  ): void {
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        var check = data.filter(
          (x) =>
            // 0 không
            (x.eventtype == selectedLoai &&
              x.scale == selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              x.btcname == selectedBtc) ||
            // 1 không
            (!selectedLoai &&
              x.scale == selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              x.btcname == selectedBtc) ||
            (x.eventtype == selectedLoai &&
              !selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              x.btcname == selectedBtc) ||
            (x.eventtype == selectedLoai &&
              x.scale == selectedQuymo &&
              !selectedQuyenloi &&
              x.btcname == selectedBtc) ||
            (x.eventtype == selectedLoai &&
              x.scale == selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              !selectedBtc) ||
            // 2 không
            (!selectedLoai &&
              !selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              x.btcname == selectedBtc) ||
            (!selectedLoai &&
              x.scale == selectedQuymo &&
              !selectedQuyenloi &&
              x.btcname == selectedBtc) ||
            (!selectedLoai &&
              x.scale == selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              !selectedBtc) ||
            (x.eventtype == selectedLoai &&
              !selectedQuymo &&
              !selectedQuyenloi &&
              x.btcname == selectedBtc) ||
            (x.eventtype == selectedLoai &&
              !selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              !selectedBtc) ||
            (x.eventtype == selectedLoai &&
              x.scale == selectedQuymo &&
              !selectedQuyenloi &&
              !selectedBtc) ||
            // 3 không
            (!selectedLoai &&
              !selectedQuymo &&
              !selectedQuyenloi &&
              x.btcname == selectedBtc) ||
            (!selectedLoai &&
              !selectedQuymo &&
              x.quyenloiopt?.includes(selectedQuyenloi) &&
              !selectedBtc) ||
            (x.eventtype == selectedLoai &&
              !selectedQuymo &&
              !selectedQuyenloi &&
              !selectedBtc) ||
            (!selectedLoai &&
              x.scale == selectedQuymo &&
              !selectedQuyenloi &&
              !selectedBtc)
        );
        this.chuongtrinh2 = check;
        if (check.length > 0) {
          let u = check[0];
          this.iff = false;
        } else {
          this.iff = true;
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
