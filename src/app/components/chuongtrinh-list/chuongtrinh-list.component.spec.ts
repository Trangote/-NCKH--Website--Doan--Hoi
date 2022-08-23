import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuongtrinhListComponent } from './chuongtrinh-list.component';

describe('ChuongtrinhListComponent', () => {
  let component: ChuongtrinhListComponent;
  let fixture: ComponentFixture<ChuongtrinhListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChuongtrinhListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuongtrinhListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
