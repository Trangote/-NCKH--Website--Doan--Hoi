import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Chuongtrinh } from '../models/doanhoi.model';

@Injectable({
  providedIn: 'root',
})
export class ThongbaoService {
  private dbPath = '/events/';

  doanhoiRef: AngularFireList<Chuongtrinh>;
  constructor(private db: AngularFireDatabase) {
    this.doanhoiRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Chuongtrinh> {
    this.doanhoiRef = this.db.list(this.dbPath);
    return this.doanhoiRef;
  }

  create(thongbao: Chuongtrinh, e: Chuongtrinh): any {
    let thongbaoRef = this.db.list(this.dbPath + '/' + e.key + '/thongbao/');
    return thongbaoRef.push(thongbao);
  }

  update(key: string, value: any): Promise<void> {
    this.doanhoiRef = this.db.list(this.dbPath);
    return this.doanhoiRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    this.doanhoiRef = this.db.list(this.dbPath);
    return this.doanhoiRef.remove(key);
  }

  deleteAll(): Promise<void> {
    this.doanhoiRef = this.db.list(this.dbPath);
    return this.doanhoiRef.remove();
  }
}
