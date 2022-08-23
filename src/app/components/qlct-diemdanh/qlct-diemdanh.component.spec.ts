import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlctDiemdanhComponent } from './qlct-diemdanh.component';

describe('QlctDiemdanhComponent', () => {
  let component: QlctDiemdanhComponent;
  let fixture: ComponentFixture<QlctDiemdanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlctDiemdanhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlctDiemdanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
