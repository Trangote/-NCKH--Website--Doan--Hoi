import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChuongtrinhComponent } from './add-chuongtrinh.component';

describe('AddChuongtrinhComponent', () => {
  let component: AddChuongtrinhComponent;
  let fixture: ComponentFixture<AddChuongtrinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChuongtrinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChuongtrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
