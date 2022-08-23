import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Chuongtrinh, Thongbao } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qlct-thongbao',
  templateUrl: './qlct-thongbao.component.html',
  styleUrls: ['./qlct-thongbao.component.css'],
})
export class QlctThongbaoComponent implements OnInit {
  @Input() thongbao?: Chuongtrinh | undefined;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  danhsachthongbao?: any;
  tb?: Thongbao[];
  tb2?: Array<Thongbao> = [];
  message = '';
  getchuongtrinh?: Array<Chuongtrinh> = [];
  chuongtrinhgetduoc?: Chuongtrinh | any;
  currentIndex = -1;

  constructor(
    private chuongtrinhService: ChuongtrinhService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveTb();
  }
  ngOnChanges(): void {}

  retrieveTb(): void {
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
        for (let i = 0; i < this.getchuongtrinh.length; i++) {
          this.chuongtrinhService
            .danhsachthongbao(this.chuongtrinhgetduoc[i])
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
            .subscribe((data) => {
              this.tb = data;
              this.tb2 = [];
              for (let i = 0; i < this.tb.length; i++) {
                this.tb[i].thongbao = this.tb[i].thongbao?.replace(
                  /(?:\r\n|\r|\n)/g,
                  '<br>'
                );
                this.tb2?.push(data[i]);
              }
            });
        }
      });
  }
}
