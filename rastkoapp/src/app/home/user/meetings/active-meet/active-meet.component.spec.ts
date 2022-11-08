import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMeetComponent } from './active-meet.component';

describe('ActiveMeetComponent', () => {
  let component: ActiveMeetComponent;
  let fixture: ComponentFixture<ActiveMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
