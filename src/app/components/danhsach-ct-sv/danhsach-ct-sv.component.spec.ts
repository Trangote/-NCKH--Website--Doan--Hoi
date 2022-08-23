import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachCtSvComponent } from './danhsach-ct-sv.component';

describe('DanhsachCtSvComponent', () => {
  let component: DanhsachCtSvComponent;
  let fixture: ComponentFixture<DanhsachCtSvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachCtSvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachCtSvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
