import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchAutomationComponent } from './launch-automation.component';

describe('LaunchAutomationComponent', () => {
  let component: LaunchAutomationComponent;
  let fixture: ComponentFixture<LaunchAutomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchAutomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
