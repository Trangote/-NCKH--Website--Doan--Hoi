import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Doanhoi } from 'src/app/models/doanhoi.model';
import { DoanhoiService } from 'src/app/services/doanhoi.service';

@Component({
  selector: 'app-doanhoi-details',
  templateUrl: './doanhoi-details.component.html',
  styleUrls: ['./doanhoi-details.component.css'],
})
export class DoanhoiDetailsComponent implements OnInit {
  @Input() doanhoi?: Doanhoi;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentDoanhoi: Doanhoi = {
    username: '',
    password: '',
    published: false,
  };
  message = '';

  constructor(private doanhoiService: DoanhoiService) {}

  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentDoanhoi = { ...this.doanhoi };
  }

  updatePublished(status: boolean): void {
    if (this.currentDoanhoi.key) {
      this.doanhoiService
        .update(this.currentDoanhoi.key, { published: status })
        .then(() => {
          this.currentDoanhoi.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch((err) => console.log(err));
    }
  }

  updateDoanhoi(): void {
    const data = {
      username: this.currentDoanhoi.username,
      password: this.currentDoanhoi.password,
    };
    if (this.currentDoanhoi.key) {
      this.doanhoiService
        .update(this.currentDoanhoi.key, data)
        .then(() => (this.message = 'The tutorial was updated successfully!'))
        .catch((err) => console.log(err));
    }
  }

  deleteDoanhoi(): void {
    if (this.currentDoanhoi.key) {
      this.doanhoiService
        .delete(this.currentDoanhoi.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch((err) => console.log(err));
    }
  }
}
