import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMeetingsComponent } from './member-meetings.component';

describe('MemberMeetingsComponent', () => {
  let component: MemberMeetingsComponent;
  let fixture: ComponentFixture<MemberMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
