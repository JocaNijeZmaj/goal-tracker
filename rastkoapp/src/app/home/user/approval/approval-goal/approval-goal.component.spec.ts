import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalGoalComponent } from './approval-goal.component';

describe('ApprovalGoalComponent', () => {
  let component: ApprovalGoalComponent;
  let fixture: ComponentFixture<ApprovalGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
