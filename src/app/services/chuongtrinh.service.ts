import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Chuongtrinh, Enrollmentlist, Thongbao } from '../models/doanhoi.model';

@Injectable({
  providedIn: 'root',
})
export class ChuongtrinhService {
  private dbPath = '/events';
  path?: string;
  // p?: Chuongtrinh;

  doanhoiRef: AngularFireList<Chuongtrinh>;
  thongbaoRef: AngularFireList<Chuongtrinh>;
  constructor(private db: AngularFireDatabase) {
    this.doanhoiRef = db.list(this.dbPath);
    this.thongbaoRef = db.list(this.dbPath + '/' + this.path + '/thongbao/');
  }
  getAll(): AngularFireList<Chuongtrinh> {
    this.doanhoiRef = this.db.list(this.dbPath);
    return this.doanhoiRef;
  }
  create(doanhoi: Chuongtrinh): any {
    this.doanhoiRef = this.db.list(this.dbPath);
    let key1 = doanhoi.eventname?.replace(/ /g, '_');
    let key = key1?.replace(/\./g, '_');
    if (key === undefined) {
      key = 'default';
    }
    doanhoi.key = key;
    return this.doanhoiRef.set(key, doanhoi);
  }
  enrollmentlist(chuongtrinh: Chuongtrinh, danhsach: Enrollmentlist): any {
    let key = danhsach.userid?.replace(/ /g, '_');
    if (key === undefined) {
      key = 'default';
    }
    danhsach.key = key;
    let userRef = this.db.list(
      this.dbPath + '/' + chuongtrinh.key + '/enrollmentlist/'
    );
    return userRef.set(key, danhsach);
  }
  thongbao(chuongtrinh: Chuongtrinh, danhsach: Thongbao): any {
    let thongbaoRef = this.db.list(
      this.dbPath + '/' + chuongtrinh.key + '/thongbao/'
    );
    return thongbaoRef.push(danhsach);
  }
  danhsachthongbao(chuongtrinh: Chuongtrinh): AngularFireList<Chuongtrinh> {
    this.doanhoiRef = this.db.list(
      this.dbPath + '/' + chuongtrinh.key + '/thongbao'
    );
    return this.doanhoiRef;
  }
  update(key: string, value: any): Promise<void> {
    this.doanhoiRef = this.db.list(this.dbPath);
    return this.doanhoiRef.update(key, value);
  }
  update2(key: string, value: any): Promise<void> {
    this.doanhoiRef = this.db.list(this.dbPath);
    return this.doanhoiRef.update(key, value);
  }
  updateEnrollmentlist(
    chuongtrinh: Chuongtrinh,
    key: any,
    value: any
  ): Promise<void> {
    this.doanhoiRef = this.db.list(
      this.dbPath + '/' + chuongtrinh.key + '/enrollmentlist'
    );
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
  getdanhsachuserdadangky(
    chuongtrinh: Chuongtrinh
  ): AngularFireList<Chuongtrinh> {
    this.doanhoiRef = this.db.list(
      this.dbPath + '/' + chuongtrinh.key + '/enrollmentlist/'
    );
    return this.doanhoiRef;
  }
  createsoluongdk(chuongtrinh: Chuongtrinh, value: string): any {
    let doanhoi2Ref = this.db.list(this.dbPath + '/' + chuongtrinh.key + '/');
    return doanhoi2Ref.push(value);
  }
}
