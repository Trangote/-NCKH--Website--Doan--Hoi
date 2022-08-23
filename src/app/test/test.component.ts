import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private dbPath = "/users";
  studentRef: AngularFireList<any>;
  studentList: any;
  constructor(private db: AngularFireDatabase) {
    this.studentRef = db.list(this.dbPath);
    // this.studentList = new Array<Student>();
  }
  ngOnInit(): void {
    this.studentRef.snapshotChanges(['child_added'])
      // .subscribe(actions => {
      //   actions.forEach(action => {
      //     that.studentList.push(action.payload.val());
      //     console.log(that.studentList);
      //   });
      // });
    this.studentList = this.studentRef.snapshotChanges(['child_added'])
      .pipe(map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ));
  }
  newStudent(): void {
    let user = new Student();
    user.username = 'test';
    user.password = '123456';
    this.studentRef?.push(user);
  }
}
class Student {
  username: string | undefined;
  password: string | undefined;
}