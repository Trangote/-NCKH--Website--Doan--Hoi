import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuongtrinhChitietSvComponent } from './chuongtrinh-chitiet-sv.component';

describe('ChuongtrinhChitietSvComponent', () => {
  let component: ChuongtrinhChitietSvComponent;
  let fixture: ComponentFixture<ChuongtrinhChitietSvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChuongtrinhChitietSvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuongtrinhChitietSvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
