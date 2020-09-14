import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMasterComponent } from './landing-master.component';

describe('LandingMasterComponent', () => {
  let component: LandingMasterComponent;
  let fixture: ComponentFixture<LandingMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
