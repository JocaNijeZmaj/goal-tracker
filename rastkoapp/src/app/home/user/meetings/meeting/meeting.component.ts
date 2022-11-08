import { Component, OnInit } from '@angular/core';
import { ActiveMeet, getTopics, Meeting, MeetStatus, OldMeet, User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  showActiveMeets = true;
  showOldMeets = true;
  activeMeets! : Meeting[];
  oldMeets! : Meeting[];
  currentUser!: User;

  constructor(private meetService : MeetingService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.currentUser;

    this.meetService.meetingCreated.subscribe((res: boolean)=>{
      this.getMeets();
    })

    this.meetService.topicAdded.subscribe((res : getTopics)=>{
      this.getMeets();
    })
    this.getMeets();
  }

  getMeets(){
    this.meetService.getMeetings(MeetStatus.Active).subscribe((response : Meeting[])=>{
      console.log(response);
      this.activeMeets = response;
     })
     this.meetService.getMeetings(MeetStatus.Finished).subscribe((response:Meeting[])=>{
      this.oldMeets = response;
      console.log(response)
     })
  }

  toggleActiveMeets(isShowed : boolean) : void{
    this.showActiveMeets = isShowed;
  }

  toggleOldMeets(isShowed : boolean) : void{
    this.showOldMeets = isShowed;
  }

}
