import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlctChungnhanComponent } from './qlct-chungnhan.component';

describe('QlctChungnhanComponent', () => {
  let component: QlctChungnhanComponent;
  let fixture: ComponentFixture<QlctChungnhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlctChungnhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlctChungnhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
