import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGoalComponent } from './member-goal.component';

describe('MemberGoalComponent', () => {
  let component: MemberGoalComponent;
  let fixture: ComponentFixture<MemberGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
