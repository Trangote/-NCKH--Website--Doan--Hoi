import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Chuongtrinh } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';

@Component({
  selector: 'app-qlct-chungnhan',
  templateUrl: './qlct-chungnhan.component.html',
  styleUrls: ['./qlct-chungnhan.component.css'],
})
export class QlctChungnhanComponent implements OnInit {
  @Input() ctCert?: Chuongtrinh;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentCert: Chuongtrinh = {
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
  };
  message = '';
  constructor(private chuongtrinhService: ChuongtrinhService) {}

  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentCert = { ...this.ctCert };
  }
  updatePublished(status: boolean): void {
    if (this.currentCert.key) {
      this.chuongtrinhService
        .update(this.currentCert.key, { published: status })
        .then(() => {
          this.currentCert.published = status;
        })
        .catch((err) => console.log(err));
    }
  }
  updateChuongtrinh(): void {
    const data = {
      cert: this.currentCert.cert,
    };
    if (this.currentCert.key) {
      this.chuongtrinhService
        .update(this.currentCert.key, data)
        .then(() => alert('Update successfully!'))
        .catch((err) => console.log(err));
    }
  }
}
