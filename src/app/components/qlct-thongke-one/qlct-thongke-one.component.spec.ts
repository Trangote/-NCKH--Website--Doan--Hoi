import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlctThongkeOneComponent } from './qlct-thongke-one.component';

describe('QlctThongkeOneComponent', () => {
  let component: QlctThongkeOneComponent;
  let fixture: ComponentFixture<QlctThongkeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlctThongkeOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlctThongkeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
