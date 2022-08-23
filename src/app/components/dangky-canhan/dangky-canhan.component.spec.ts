import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkyCanhanComponent } from './dangky-canhan.component';

describe('DangkyCanhanComponent', () => {
  let component: DangkyCanhanComponent;
  let fixture: ComponentFixture<DangkyCanhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkyCanhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkyCanhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
