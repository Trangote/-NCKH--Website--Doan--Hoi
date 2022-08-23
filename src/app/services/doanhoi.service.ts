import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Doanhoi } from '../models/doanhoi.model';


@Injectable({
  providedIn: 'root'
})
export class DoanhoiService {
  private dbPath = '/doanhoi';

  doanhoiRef: AngularFireList<Doanhoi>;
  constructor(private db: AngularFireDatabase) { 
    this.doanhoiRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Doanhoi> {
    return this.doanhoiRef;
  }

  create(doanhoi: Doanhoi): any {
    return this.doanhoiRef.push(doanhoi);
  }

  update(key: string, value: any): Promise<void> {
    return this.doanhoiRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.doanhoiRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.doanhoiRef.remove();
  }
}
