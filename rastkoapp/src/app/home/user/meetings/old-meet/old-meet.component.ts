import { Component, Input, OnInit } from '@angular/core';
import { Meeting, OldMeet, Roles, UpdateNote, UpdateNotes, User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-old-meet',
  templateUrl: './old-meet.component.html',
  styleUrls: ['./old-meet.component.css']
})
export class OldMeetComponent implements OnInit {

  @Input() oldMeet! : Meeting;
  noteText!: string ;
  showNoteContainer = false;
  currentUser! : User;

  constructor(private meetingService:  MeetingService, private loginService : LoginService) { }

  ngOnInit(): void {

    this.currentUser = this.loginService.currentUser;

    if(this.currentUser.role===Roles.Manager){
      this.noteText = this.oldMeet.managerNotes;
    }else{
      this.noteText = this.oldMeet.employeeNotes;
    }


  }

  OpenNote(){
    this.showNoteContainer = !this.showNoteContainer
  }
  saveNote(){
    const updateNote : UpdateNote = {meetingId : this.oldMeet.id , noteUpdate : this.noteText}
    this.meetingService.updateNotes(updateNote).subscribe({
      next: (response : UpdateNotes) => {
        if(this.currentUser.role===Roles.Manager){
          this.noteText = response.managerNotes;
        }else{
          this.noteText = response.employeeNotes;
        }
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
  this.showNoteContainer = false;
  }
}
