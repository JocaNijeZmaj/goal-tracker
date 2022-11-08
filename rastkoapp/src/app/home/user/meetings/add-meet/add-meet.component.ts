import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewMeet,} from 'src/app/entities';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-add-meet',
  templateUrl: './add-meet.component.html',
  styleUrls: ['./add-meet.component.css']
})
export class AddMeetComponent implements OnInit,OnDestroy {

  isSentSuccessfully = false;
  AddMeetDisplay = false;
  newThemeName! : string;
  todayDate! : string ;
  themes : string[] = [];
  validThemes = false;
  addedMeetSubscription! : Subscription;

  constructor(private meetingService : MeetingService) { }

  ngOnInit(): void {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    this.todayDate = `${yyyy}-${mm}-${dd}`;
    this.checkValidityOfThemes();

  }
  onInputChange(e : any){
    this.newThemeName = e.target.value ;
  }
  openAddMeet(){
    this.AddMeetDisplay = !this.AddMeetDisplay
    this.themes = []
  }

  checkValidityOfThemes(){
    if(this.themes.length === 0){
      this.validThemes =false ;
    }else {
      this.validThemes = true;
    }
  }

  addTheme(){

    this.themes.push(this.newThemeName);
    this.newThemeName = "";
    this.checkValidityOfThemes();
  }
  deleteTask(uId: number){
    this.themes.splice(uId,1);
    this.checkValidityOfThemes();
  }

  createMeet(form: NgForm){
    const memberEmail = form.controls["member"].value;
    const meetName = form.controls["meetName"].value;
    const link = form.controls["link"].value;
    const due_date = form.controls["date"].value;
    const time = form.controls["time"].value;

    console.log(time);

    const dateArr = due_date.split("-");
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    const formatedDate = `${year}-${month}-${day}`;

    const formatedTime = `${time}:00`

    const newMeet : NewMeet = {
      title : meetName,
      link : link,
      date : formatedDate,
      employeeEmail : memberEmail,
      topics : this.themes,
      time: formatedTime
    }

    console.log(newMeet);

    this.addedMeetSubscription = this.meetingService.createMeet(newMeet).subscribe({
      next: (response : NewMeet) => {
        console.log(response);
        this.isSentSuccessfully = true;
        this.themes = []
        this.meetingService.meetingCreated.next(true);
    },
    error: (error : Error) => {
        console.error('There was an error!', error);
        this.isSentSuccessfully = false;
    }
    })

  }

  ngOnDestroy(): void {
    this.addedMeetSubscription?.unsubscribe();
  }

}
