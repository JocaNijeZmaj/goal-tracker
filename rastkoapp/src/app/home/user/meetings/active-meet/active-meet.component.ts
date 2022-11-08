import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActiveMeet, getTopics, Meeting, Roles, UpdateMeet, UpdateNote, UpdateNotes, updateTopic, User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
import { castName } from 'src/app/static-files';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-active-meet',
  templateUrl: './active-meet.component.html',
  styleUrls: ['./active-meet.component.css']
})
export class ActiveMeetComponent implements OnInit {

  @Input() activeMeet! : Meeting;
  currentUser!: User;
  newTopic! : string;
  addingTopics = false;
  deletingTopics = false;
  showEditOptions = false;
  showTopics = false;
  showNoteContainer = false;
  editingTitle = false;
  noteText!: string ;
  fullName!: string;

  constructor(private meetingService:  MeetingService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.fullName = castName(this.activeMeet.employeeEmail);


    this.currentUser = this.loginService.currentUser;
    console.log(this.activeMeet.topics)

    if(this.currentUser.role===Roles.Manager){
      this.noteText = this.activeMeet.managerNotes;
    }else{
      this.noteText = this.activeMeet.employeeNotes;
    }
  }
  toggleShowTopics() {
    this.showTopics = !this.showTopics
  }

  OpenNote(){
    this.showNoteContainer = !this.showNoteContainer
  }

  saveNote(){
    const updateNote : UpdateNote = {meetingId : this.activeMeet.id , noteUpdate : this.noteText}
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
  addTopic(){
    const updatedTopic: updateTopic = {meetingId: this.activeMeet.id, topicTitle: this.newTopic}
    this.meetingService
    .addTopics(updatedTopic)
    .subscribe((res : getTopics)=> {
      console.log(res)
      this.meetingService.topicAdded.next(res);
    })
  }
  deleteTopic(i : number){
    const topicId = this.activeMeet.topics[i].id;
    this.meetingService.deleteTopic(topicId).subscribe();
    this.activeMeet.topics.splice(i, 1);
  }
  saveEditedChanges(){
    const updateMeet : UpdateMeet = {
      id: this.activeMeet.id,
      title: this.activeMeet.title,
      link: this.activeMeet.link,
      date: this.activeMeet.date,
      topics: this.activeMeet.topics.map(e => e.topicTitle),

    }
    this.meetingService.updateMeet(updateMeet);
    this.editingTitle = false;
    this.showEditOptions = false;


  }
  deleteMeet(){
    this.meetingService.deleteMeet(this.activeMeet.id).subscribe(res => location.reload());
  }
}
