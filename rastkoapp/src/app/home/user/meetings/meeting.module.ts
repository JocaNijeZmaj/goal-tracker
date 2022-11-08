import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MeetingService } from './services/meeting.service';
import { ActiveMeetComponent } from './active-meet/active-meet.component';
import { OldMeetComponent } from './old-meet/old-meet.component';
import { AddMeetComponent } from './add-meet/add-meet.component';
import { MeetingComponent } from './meeting/meeting.component';
import { TimePipe } from './_pipes/time.pipe';


@NgModule({
  declarations: [
    MeetingComponent,
    OldMeetComponent,
    AddMeetComponent,
    ActiveMeetComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports : [
    ActiveMeetComponent
  ],
  providers: [MeetingService]
})
export class MeetingModule { }
