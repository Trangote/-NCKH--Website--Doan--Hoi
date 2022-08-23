import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { User, Dangkythamgia, Chuongtrinh } from '../models/doanhoi.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/user';
  userRef: AngularFireList<User>;
  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<User> {
    this.userRef = this.db.list(this.dbPath);
    return this.userRef;
  }
  create(user: User): any {
    this.userRef = this.db.list(this.dbPath);
    let key1 = user.email?.replace(/ /g, '_');
    let key = key1?.replace(/\./g, '_');
    if (key === undefined) {
      key = 'default';
    }
    user.key = key;
    return this.userRef.set(key, user);
  }
  dangkythamgia(user: User, dangkythamgia: Dangkythamgia): any {
    let key1 = dangkythamgia.eventname?.replace(/ /g, '_');
    let key = key1?.replace(/\./g, '_');
    if (key === undefined) {
      key = 'default';
    }
    dangkythamgia.key = key;
    let userRef = this.db.list(this.dbPath + '/' + user.key + '/events/');
    return userRef.set(key, dangkythamgia);
  }
  getdanhsachctdadangky(user: User): AngularFireList<User> {
    this.userRef = this.db.list(this.dbPath + '/' + user.key + '/events/');
    return this.userRef;
  }
  update(key: string, value: any): Promise<void> {
    this.userRef = this.db.list(this.dbPath);
    return this.userRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    this.userRef = this.db.list(this.dbPath);
    return this.userRef.remove(key);
  }

  deleteAll(): Promise<void> {
    this.userRef = this.db.list(this.dbPath);
    return this.userRef.remove();
  }
  chuongtrinhquantam(user: User, chuongtrinh: Chuongtrinh): any {
    let key1 = chuongtrinh.eventname?.replace(/ /g, '_');
    let key = key1?.replace(/\./g, '_');
    if (key === undefined) {
      key = 'default';
    }
    chuongtrinh.key = key;
    let userRef = this.db.list(this.dbPath + '/' + user.key + '/quantam/');
    return userRef.set(key, chuongtrinh);
  }
  xoachuongtrinhquantam(user: User, key: string): any {
    let userRef = this.db.list(this.dbPath + '/' + user.key + '/quantam/');
    return userRef.remove(key);
  }
  getdsctquantam(user: User): AngularFireList<User> {
    this.userRef = this.db.list(this.dbPath + '/' + user.key + '/quantam/');
    return this.userRef;
  }
}
