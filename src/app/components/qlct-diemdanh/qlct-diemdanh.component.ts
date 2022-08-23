import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Chuongtrinh, Enrollmentlist } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qlct-diemdanh',
  templateUrl: './qlct-diemdanh.component.html',
  styleUrls: ['./qlct-diemdanh.component.css'],
})
export class QlctDiemdanhComponent implements OnInit {
  @Input() diemdanh?: Chuongtrinh;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentChuongtrinh?: Chuongtrinh;
  message = '';
  currentIndex = -1;
  enrollmentlist?: Enrollmentlist[];
  searchText?: string;
  currentSV?: Enrollmentlist;
  getchuongtrinh?: Array<Chuongtrinh> = [];
  chuongtrinhgetduoc?: Chuongtrinh | any;
  constructor(
    private chuongtrinhService: ChuongtrinhService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.retrieveChuongtrinh();
    this.retrieveEnrollmentlist();
  }
  ngOnChanges(): void {
    this.message = '';
  }
  setActiveDoanhoi(
    sv: Enrollmentlist,
    index: number,
    chuongtrinh: Chuongtrinh
  ): void {
    this.refreshList1();
    this.currentSV = sv;
    this.currentIndex = index;
    this.currentChuongtrinh = chuongtrinh;
  }
  refreshList1(): void {
    this.currentSV = undefined;
    this.currentIndex = -1;
    this.retrieveEnrollmentlist();
  }
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
      });
  }
  retrieveEnrollmentlist() {
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
        for (let i = 0; i < this.chuongtrinhgetduoc.length; i++) {
          this.chuongtrinhService
            .getdanhsachuserdadangky(this.chuongtrinhgetduoc[i])
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
            .subscribe((data) => {
              this.enrollmentlist = data;
            });
        }
      });
  }
}
