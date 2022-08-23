import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Chuongtrinh, Enrollmentlist } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.css'],
})
export class CheckinDetailComponent implements OnInit {
  @Input() chuongtrinh?: Chuongtrinh;
  @Input() sinhvien?: Enrollmentlist;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentChuongtrinh1: Chuongtrinh = {
    eventname: '',
    eventtype: '',
    scale: '',
    timeend: '',
    timestart: '',
    description: '',
    shortdescription: '',
    timeline: '',
    benefit: '',
    banner: '',
    img1gioithieu: '',
    img2benefit: '',
    img3timeline: '',
    fee: '',
    screative: '',
    straining: '',
    sconnect: '',
    sknow: '',
    sskill: '',
    cert: '',
    quyenloiopt: '',
  };
  currentSV: Enrollmentlist = {
    userid: '',
    checkinstatus: false,
    imgpayment: '',
    checkintime: '',
    faculty: '',
    khoa: '',
    phonenumber: '',
    fullname: '',
    studentcode: '',
  };
  svcuthe?: Enrollmentlist[];
  svcheck?: Enrollmentlist;
  constructor(private chuongtrinhService: ChuongtrinhService) {}

  ngOnInit(): void {
    this.sosanhuser();
  }
  ngOnChanges(): void {
    this.currentChuongtrinh1 = { ...this.chuongtrinh };
    this.currentSV = { ...this.sinhvien };
  }
  updatePublished(status: boolean): void {
    var today = new Date().getTime();
    var todays = today.toString();
    if (this.currentChuongtrinh1.key) {
      this.chuongtrinhService
        .updateEnrollmentlist(this.currentChuongtrinh1, this.currentSV.key, {
          checkinstatus: status,
          checkintime: todays,
        })
        .then(() => {
          this.currentSV.checkinstatus = status;
          this.currentSV.checkintime = todays;
        })
        .catch((err) => console.log(err));
    }
    this.currentSV.checkinstatus = status;
  }
  sosanhuser() {
    this.chuongtrinhService
      .getdanhsachuserdadangky(this.currentChuongtrinh1)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.svcuthe = data.filter((x) => x.key == this.currentSV.key);
        this.svcheck = this.svcuthe[0];
      });
  }
}
