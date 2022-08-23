import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhoiDanhsachComponent } from './doanhoi-danhsach.component';

describe('DoanhoiDanhsachComponent', () => {
  let component: DoanhoiDanhsachComponent;
  let fixture: ComponentFixture<DoanhoiDanhsachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoanhoiDanhsachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhoiDanhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
