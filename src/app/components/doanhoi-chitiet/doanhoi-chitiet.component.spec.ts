import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhoiChitietComponent } from './doanhoi-chitiet.component';

describe('DoanhoiChitietComponent', () => {
  let component: DoanhoiChitietComponent;
  let fixture: ComponentFixture<DoanhoiChitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoanhoiChitietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhoiChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
