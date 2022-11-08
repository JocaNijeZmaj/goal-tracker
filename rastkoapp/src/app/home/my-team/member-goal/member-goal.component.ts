import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { EditGoal, Goal, PostFinalReport, FinalReport, Task } from 'src/app/entities';
import { MyTeamService } from '../services/my-team.service';

@Component({
  selector: 'app-member-goal',
  templateUrl: './member-goal.component.html',
  styleUrls: ['./member-goal.component.css']
})
export class MemberGoalComponent implements OnInit {

  @Input() goal! : Goal ;
  @Input() goalStatus! : string ;
  @Input() goalType! : string;  
  showTasks = false ; 
  percentageOfSuccess = 0 ; 
  percentageOfSuccessDisplay = 0 ; 
  openGradeForm = false;
  postFinalReport: PostFinalReport = {
    goal_id: "",
    manager_email: "",
    text: "",
    grade: 0,
  }
  constructor(private myTeamService : MyTeamService ) { }


  ngOnInit(): void {
    this.calculatePercentage();


  }
  gradeForm(){
    this.openGradeForm = !this.openGradeForm
  }
  saveFinalReport(){

    this.postFinalReport.goal_id = this.goal.id;
    this.postFinalReport.manager_email = this.myTeamService.selectedMember.manager?.email!;
    console.log(this.postFinalReport);
    this.myTeamService.createFinaleReport(this.postFinalReport)
    .subscribe((res) => {
      console.log(res)
      this.myTeamService.addedGrade.next(true);
    })
    this.openGradeForm = !this.openGradeForm;


  }
  
  updateGoal(){
    this.showTasks = false; 

    const goal : EditGoal = {
      id : this.goal.id,
      description :this.goal.description,
      subtasks : this.goal.subtasks
    } 
    this.myTeamService.updateGoal(goal);
    this.calculatePercentage();
  }
  doneTask(task : Task){
    task.done = !task.done; 
    this.calculatePercentage();
  }

  calculatePercentage(){
    const numOfTasks = this.goal.subtasks.length;
    const resolvedTasks = this.goal.subtasks.filter(t => t.done);

    this.percentageOfSuccess= resolvedTasks.length > 0 ? 
                              (resolvedTasks.length / numOfTasks)*100 : 0; 
    this.percentageOfSuccessDisplay = Math.round(this.percentageOfSuccess);
  }
}