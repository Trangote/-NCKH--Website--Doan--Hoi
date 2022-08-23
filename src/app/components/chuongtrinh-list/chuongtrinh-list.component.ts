import { Component, OnInit } from '@angular/core';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { BtcService } from 'src/app/services/btc.service';
import { Chuongtrinh, Thongbao, Btc } from 'src/app/models/doanhoi.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chuongtrinh-list',
  templateUrl: './chuongtrinh-list.component.html',
  styleUrls: ['./chuongtrinh-list.component.css'],
})
export class ChuongtrinhListComponent implements OnInit {
  chuongtrinh?: Array<Chuongtrinh> = [];
  ct?: Chuongtrinh[];
  currentChuongtrinh?: Chuongtrinh;
  currentIndex = -1;
  ctCert?: Chuongtrinh[];
  currentCert?: Chuongtrinh;
  thongbao?: Chuongtrinh[];
  currentThongbao?: Chuongtrinh;
  diemdanh?: Chuongtrinh[];
  thongke?: Chuongtrinh[];
  currentThongke?: Chuongtrinh;
  currentDiemdanh?: Chuongtrinh;
  title = '';
  thongbao1?: Thongbao[];
  searchText?: string;
  selectSapxep: Array<string> = ['Ngày mới nhất', 'Ngày cũ nhất'];
  selectedSapxep?: any;
  btcid = localStorage.getItem('btcid')?.replace(/"/g, '');
  btcemail = localStorage.getItem('btcemail')?.replace(/"/g, '');
  password = localStorage.getItem('password')?.replace(/"/g, '');
  btcimages = localStorage.getItem('btcimages')?.replace(/"/g, '');
  btcname = localStorage.getItem('btcname')?.replace(/"/g, '');
  selectChuongtrinhdadangky?: Chuongtrinh[];
  btc?: Btc[];
  btcn?: Btc;
  chuongtrinh1?: Chuongtrinh[];
  constructor(
    private chuongtrinhService: ChuongtrinhService,
    private BtcService: BtcService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.retrieveLichsudangtai();
  }
  retrieveLichsudangtai() {
    var u: Btc = {
      btcid: this.btcid,
      btcemail: this.btcemail,
      password: this.password,
    };
    this.BtcService.getdanhsachct(u)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.ct = data;
        this.chuongtrinh = [];
        for (let i = 0; i < this.ct.length; i++) {
          this.ct[i].eventname = this.ct[i].eventname?.replace(/=/g, '.');
          this.chuongtrinh?.push(this.ct[i]);
        }
      });
  }
  sortBy(item: any) {
    if (item == 'Ngày cũ nhất') {
      return this.chuongtrinh?.sort((a: any, b: any) => {
        return <any>new Date(b.ngayDangTai) - <any>new Date(a.ngayDangTai);
      });
    } else {
      return this.chuongtrinh?.sort((a: any, b: any) => {
        return <any>new Date(a.ngayDangTai) - <any>new Date(b.ngayDangTai);
      });
    }
  }
  getBTC() {
    var u: Btc = {
      btcid: this.btcid,
      btcemail: this.btcemail,
      password: this.password,
    };
    this.BtcService.getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.btc = data.filter((x) => x.btcid == u.btcid);
        if (this.btc.length > 0) {
          this.btcn = this.btc[0];
        }
      });
  }
  setActiveDoanhoi(chuongtrinh: Chuongtrinh, index: number): void {
    this.currentChuongtrinh = chuongtrinh;
    this.currentIndex = index;
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
  themchuongtrinh() {
    this.router.navigate(['/chuongtrinh']);
  }
  lichsudangtai() {
    this.router.navigate(['/chuongtrinhlist']);
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
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
  styleUrls: ['./chuongtrinh-list.component.css'],
})
export class DialogElementsExampleDialog {}
