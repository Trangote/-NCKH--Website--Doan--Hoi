import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Chuongtrinh, Btc } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { BtcService } from 'src/app/services/btc.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-chuongtrinh-detail',
  templateUrl: './chuongtrinh-detail.component.html',
  styleUrls: ['./chuongtrinh-detail.component.css'],
})
export class ChuongtrinhDetailComponent implements OnInit {
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  btcid = localStorage.getItem('btcid')?.replace(/"/g, '');
  btcemail = localStorage.getItem('btcemail')?.replace(/"/g, '');
  password = localStorage.getItem('password')?.replace(/"/g, '');
  message = '';
  getchuongtrinh?: Array<Chuongtrinh> = [];
  chuongtrinhgetduoc?: Chuongtrinh | any;
  constructor(
    private chuongtrinhService: ChuongtrinhService,
    private btcService: BtcService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.retrieveChuongtrinh();
  }
  ngOnChanges(): void {}
  retrieveChuongtrinh() {
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        var routeParams = this.route.snapshot.paramMap;
        var productIdFromRoute = routeParams.get('key');
        this.getchuongtrinh = [];
        this.chuongtrinhgetduoc = data.filter(
          (x) => x.key == productIdFromRoute
        );
        this.getchuongtrinh?.push(this.chuongtrinhgetduoc);
      });
  }
  updateChuongtrinh(): void {
    var u: Btc = {
      btcid: this.btcid,
      btcemail: this.btcemail,
      password: this.password,
    };
    for (let i = 0; i < this.chuongtrinhgetduoc.length; i++) {
      const data = {
        eventname: this.chuongtrinhgetduoc[i].eventname,
        eventtype: this.chuongtrinhgetduoc[i].eventtype,
        scale: this.chuongtrinhgetduoc[i].scale,
        timeend: this.chuongtrinhgetduoc[i].timeend,
        timestart: this.chuongtrinhgetduoc[i].timestart,
        description: this.chuongtrinhgetduoc[i].description,
        shortdescription: this.chuongtrinhgetduoc[i].shortdescription,
        timeline: this.chuongtrinhgetduoc[i].timeline,
        benefit: this.chuongtrinhgetduoc[i].benefit,
        fee: this.chuongtrinhgetduoc[i].fee,
        screative: this.chuongtrinhgetduoc[i].screative,
        straining: this.chuongtrinhgetduoc[i].straining,
        sskill: this.chuongtrinhgetduoc[i].sskill,
        sconnect: this.chuongtrinhgetduoc[i].sconnect,
        sknow: this.chuongtrinhgetduoc[i].sknow,
        banner: this.chuongtrinhgetduoc[i].banner,
        imgavatar: this.chuongtrinhgetduoc[i].imgavatar,
        img1gioithieu: this.chuongtrinhgetduoc[i].img1gioithieu,
        img2benefit: this.chuongtrinhgetduoc[i].img2benefit,
        img3timeline: this.chuongtrinhgetduoc[i].img3timeline,
        quyenloiopt: this.chuongtrinhgetduoc[i].quyenloiopt,
      };
      if (this.chuongtrinhgetduoc[i].key) {
        this.chuongtrinhService.update(this.chuongtrinhgetduoc[i].key, data);
        this.btcService
          .updateCT(u, this.chuongtrinhgetduoc[i].key, data)
          .then(() => this.openDialog())
          .catch((err) => console.log(err));
      }
    }
  }
  deleteChuongtrinh(): void {
    var u: Btc = {
      btcid: this.btcid,
      btcemail: this.btcemail,
      password: this.password,
    };
    for (let i = 0; i < this.chuongtrinhgetduoc.length; i++) {
      if (this.chuongtrinhgetduoc[i].key) {
        this.chuongtrinhService
          .delete(this.chuongtrinhgetduoc[i].key)
          .then(() => {
            this.refreshList.emit();
            this.router.navigate(['/chuongtrinhlist']);
          })
          .catch((err) => console.log(err));
      }
      if (this.chuongtrinhgetduoc[i].key) {
        this.btcService
          .deleteEvent(u, this.chuongtrinhgetduoc[i].key)
          .then(() => {
            this.refreshList.emit();
            this.openDialog1();
          })
          .catch((err) => console.log(err));
      }
    }
  }
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
        <i class="far fa-solid fa-circle-check fa-3x"></i>
      </div>
      <h2 class="text-center" mat-dialog-title>Chúc mừng!</h2>
      <div class="text-center" mat-dialog-content>
        Bạn đã cập nhật chương trình thành công.
      </div>
    </div>
    <div class="text-center">
      <button type="button" class=" btn btn-light" (click)="chuyenhuong()">
        OK
      </button>
    </div> `,
  styleUrls: ['./chuongtrinh-detail.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    private router1: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) {}
  chuyenhuong(): void {
    this.router1.navigate(['/chuongtrinhlist']);
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
  styleUrls: ['./chuongtrinh-detail.component.css'],
})
export class DialogOverviewExampleDialog1 {}
