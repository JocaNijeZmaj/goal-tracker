import { Component, Input, OnInit } from '@angular/core';
import { EditGoal, Goal, GoalType, NewTask, Task } from 'src/app/entities';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  @Input() goal! : Goal ;
  @Input() goalStatus! : string ;
  editDescription = false;
  showTasks = false ; 
  percentageOfSuccess = 0 ; 
  percentageOfSuccessDisplay = 0 ; 
  newTaskName!: string;
  newTask! :NewTask;
  constructor(private goalService : GoalService) { }


  ngOnInit(): void {
    this.calculatePercentage();
  }

  updateGoal(){
    this.showTasks = false; 

    const goal : EditGoal = {
      id : this.goal.id,
      description :this.goal.description,
      subtasks : this.goal.subtasks,
      final_report : []
    } 
    this.goalService.updateGoal(goal);
    this.calculatePercentage();
    this.editDescription = false;
  }
  doneTask(task : Task){
    task.done = !task.done; 
    this.calculatePercentage();
  }
  openGoal(){
    this.showTasks = !this.showTasks;
    this.editDescription = false;
    const goal : EditGoal = {
      id : this.goal.id,
      description :this.goal.description,
      subtasks : this.goal.subtasks,
      final_report : [] 
    } 
    console.log(goal)
    this.calculatePercentage();
  }
  addTask(){
    const newAddedTask :Task = {id : "", name : this.newTaskName, done : false}; 
    this.goal.subtasks.push(newAddedTask);
    this.newTaskName = "";
    this.calculatePercentage();
  }

  calculatePercentage(){
    const numOfTasks = this.goal.subtasks.length;
    const resolvedTasks = this.goal.subtasks.filter(t => t.done);

    this.percentageOfSuccess= resolvedTasks.length > 0 ? 
                              (resolvedTasks.length / numOfTasks)*100 : 0; 
    console.log(this.percentageOfSuccess);
    this.percentageOfSuccessDisplay = Math.round(this.percentageOfSuccess);
  }

}
