import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuongtrinhDetailComponent } from './chuongtrinh-detail.component';

describe('ChuongtrinhDetailComponent', () => {
  let component: ChuongtrinhDetailComponent;
  let fixture: ComponentFixture<ChuongtrinhDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChuongtrinhDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuongtrinhDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
