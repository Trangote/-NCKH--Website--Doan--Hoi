import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGoiyComponent } from './ct-goiy.component';

describe('CtGoiyComponent', () => {
  let component: CtGoiyComponent;
  let fixture: ComponentFixture<CtGoiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtGoiyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtGoiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
