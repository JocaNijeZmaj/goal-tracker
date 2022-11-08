import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAddGoalComponent } from './member-add-goal.component';

describe('MemberAddGoalComponent', () => {
  let component: MemberAddGoalComponent;
  let fixture: ComponentFixture<MemberAddGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAddGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberAddGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
