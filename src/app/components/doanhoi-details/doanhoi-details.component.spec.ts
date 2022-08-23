import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhoiDetailsComponent } from './doanhoi-details.component';

describe('DoanhoiDetailsComponent', () => {
  let component: DoanhoiDetailsComponent;
  let fixture: ComponentFixture<DoanhoiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoanhoiDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhoiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
