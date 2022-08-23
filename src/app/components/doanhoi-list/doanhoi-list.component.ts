import { Component, OnInit } from '@angular/core';
import { DoanhoiService } from 'src/app/services/doanhoi.service';
import { Doanhoi } from 'src/app/models/doanhoi.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doanhoi-list',
  templateUrl: './doanhoi-list.component.html',
  styleUrls: ['./doanhoi-list.component.css'],
})
export class DoanhoiListComponent implements OnInit {
  doanhoi?: Doanhoi[];
  currentDoanhoi?: Doanhoi;
  currentIndex = -1;
  title = '';
  constructor(private doanhoiService: DoanhoiService) {}

  ngOnInit(): void {
    this.retrieveDoanhoi();
  }
  refreshList(): void {
    this.currentDoanhoi = undefined;
    this.currentIndex = -1;
    this.retrieveDoanhoi();
  }

  retrieveDoanhoi(): void {
    this.doanhoiService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.doanhoi = data;
      });
  }

  setActiveDoanhoi(doanhoi: Doanhoi, index: number): void {
    this.currentDoanhoi = doanhoi;
    this.currentIndex = index;
  }

  removeAllDoanhoi(): void {
    this.doanhoiService
      .deleteAll()
      .then(() => this.refreshList())
      .catch((err) => console.log(err));
  }
}
