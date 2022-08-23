import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Thongbao } from 'src/app/models/doanhoi.model';
import { Chuongtrinh } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';

@Component({
  selector: 'app-thongbao-add',
  templateUrl: './thongbao-add.component.html',
  styleUrls: ['./thongbao-add.component.css'],
})
export class ThongbaoAddComponent implements OnInit {
  @Input() thongbaochuongtrinh?: Chuongtrinh;
  @Output() refreshList1: EventEmitter<any> = new EventEmitter();

  currentThongbao: Thongbao = {
    thongbao: '',
    ngayTaoThongBao: '',
  };
  noidungtb?: string;
  thongbao: Thongbao = new Thongbao();
  constructor(private chuongtrinhService: ChuongtrinhService) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.currentThongbao = { ...this.thongbaochuongtrinh };
  }
  thongbaoChuongtrinh(noidungtb: any): void {
    var today = new Date().getTime();
    var tb: Thongbao = {
      thongbao: noidungtb,
      ngayTaoThongBao: today.toString(),
    };
    this.chuongtrinhService.thongbao(this.currentThongbao, tb).then(() => {
      this.newThongbao();
    });
  }
  newThongbao(): void {
    this.noidungtb = '';
    this.thongbao = new Thongbao();
  }
}
