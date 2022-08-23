import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhoiListComponent } from './doanhoi-list.component';

describe('DoanhoiListComponent', () => {
  let component: DoanhoiListComponent;
  let fixture: ComponentFixture<DoanhoiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoanhoiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhoiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
