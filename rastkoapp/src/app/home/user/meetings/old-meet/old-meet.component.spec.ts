import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldMeetComponent } from './old-meet.component';

describe('OldMeetComponent', () => {
  let component: OldMeetComponent;
  let fixture: ComponentFixture<OldMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
