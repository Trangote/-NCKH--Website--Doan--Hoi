import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Btc, Chuongtrinh } from '../models/doanhoi.model';

@Injectable({
  providedIn: 'root'
})
export class BtcService {
  private dbPath = '/btc';
  btcRef: AngularFireList<Btc>;
  constructor(private db: AngularFireDatabase) { this.btcRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Btc> {
   return this.btcRef;
  }
  taoChuongtrinh(btc: Btc, chuongtrinh: Chuongtrinh): any {
    let key1 = chuongtrinh.eventname?.replace(/ /g, '_');
    let key = key1?.replace(/\./g, '_');
    if (key === undefined) {
      key = 'default';
    }
    chuongtrinh.key = key;
   let btcpath = this.db.list(this.dbPath + '/' + btc.btcid + '/events/');
   return btcpath.set(key, chuongtrinh);
  }
  getdanhsachct(btc: Btc): AngularFireList<Btc>{
    this.btcRef = this.db.list(this.dbPath + '/' + btc.btcid + '/events/');
    return this.btcRef;
  }
  updateCT(btc: Btc, key: any, value: any){
    let btcRef = this.db.list(this.dbPath + '/' + btc.btcid + '/events/');
    return btcRef.update(key, value);

  }
  deleteEvent(btc: Btc, key: string): Promise<void>{
    let btcRef = this.db.list(this.dbPath + '/' + btc.btcid + '/events/');
      return btcRef.remove(key);}
}
