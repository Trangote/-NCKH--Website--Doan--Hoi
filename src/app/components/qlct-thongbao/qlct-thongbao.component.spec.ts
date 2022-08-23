import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlctThongbaoComponent } from './qlct-thongbao.component';

describe('QlctThongbaoComponent', () => {
  let component: QlctThongbaoComponent;
  let fixture: ComponentFixture<QlctThongbaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlctThongbaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlctThongbaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
