import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Goal, GoalType, NewGoal, NewTask, User } from 'src/app/entities';
import { MyTeamService } from '../services/my-team.service';

@Component({
  selector: 'app-member-add-goal',
  templateUrl: './member-add-goal.component.html',
  styleUrls: ['./member-add-goal.component.css']
})
export class MemberAddGoalComponent implements OnInit {

  
  isSentSuccessfully = false;
  AddGoalDisplay = false;
  newTask! : NewTask ;
  newTaskName! : string;
  addedGoalSubscription! : Subscription;
  todayDate! : string ; 
  tasks :NewTask[] = [];
  validTasks = false; 
  @Input() goalType!: GoalType;
  @Input() member! : User; 
  

  constructor(private myTeamService : MyTeamService) { }

  ngOnInit(): void { 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    this.todayDate = `${yyyy}-${mm}-${dd}`;
    this.checkValidityOfTasks();
   }
  onInputChange(e : any){
    this.newTaskName = e.target.value ;
  }
  openAddGoal(){
    this.AddGoalDisplay = !this.AddGoalDisplay
    this.tasks = []
  }
  checkValidityOfTasks(){
    if(this.tasks.length === 0){
      this.validTasks =false ;
    }else {
      this.validTasks = true; 
    }
  }

  addTask(){
    const newAddedTask : NewTask = {name : this.newTaskName, done : false}; 
    this.tasks.push(newAddedTask);
    this.newTaskName = "";
    this.checkValidityOfTasks();
  }
  deleteTask(uId: number){
    this.tasks.splice(uId,1);
    this.checkValidityOfTasks();
  }

  createGoal(form: NgForm){
    const goalName = form.controls["title"].value;
    const goalDescription = form.controls["description"].value;
    const email = this.member.email; 
    const due_date = form.controls["date"].value;

    const dateArr = due_date.split("-");
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    const formatedDate = `${day}-${month}-${year}`;


    const type = this.goalType;
    const subtasks: NewTask[] = this.tasks;
    const newGoal: NewGoal = {
      name: goalName,
      description: goalDescription,
      email: email,
      due_date: formatedDate,
      type: type,
      subtasks: subtasks
    };
    
    console.log(newGoal);
    
    this.addedGoalSubscription = this.myTeamService.createGoal(newGoal).subscribe({
      next: (response : Goal) => {
        console.log(response);
        this.isSentSuccessfully = true;
        this.tasks = []
    },
    error: (error : Error) => {
        console.error('There was an error!', error);
        this.isSentSuccessfully = false;
    }
    })
    
  }

  ngOnDestroy(): void {
    this.addedGoalSubscription?.unsubscribe();
  }
}
