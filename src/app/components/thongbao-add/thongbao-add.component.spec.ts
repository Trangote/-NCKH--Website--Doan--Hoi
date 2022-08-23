import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongbaoAddComponent } from './thongbao-add.component';

describe('ThongbaoAddComponent', () => {
  let component: ThongbaoAddComponent;
  let fixture: ComponentFixture<ThongbaoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThongbaoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongbaoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
