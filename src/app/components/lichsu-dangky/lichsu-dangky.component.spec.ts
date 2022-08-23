import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsuDangkyComponent } from './lichsu-dangky.component';

describe('LichsuDangkyComponent', () => {
  let component: LichsuDangkyComponent;
  let fixture: ComponentFixture<LichsuDangkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LichsuDangkyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LichsuDangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
