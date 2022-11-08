import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EditGoal, Goal, GoalStatus, GoalType, NewGoal } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class GoalService {

  private path : string = environment.apiGate; 
  goalUpdate = new Subject<EditGoal>();

  constructor(private http: HttpClient, private loginService: LoginService) { }

  updateGoal(goal : EditGoal){
    console.log(goal);
    this.http.put(this.path + 'goal', goal).subscribe({
      next: response => {
          console.log(response);
          this.goalUpdate.next(goal);
      },
      error: error => {
          console.error('There was an error!', error);
      }
  }) 
  }

  createGoal(newGoal : NewGoal){
    return this.http.post<Goal>(this.path + 'goal', newGoal);
  }

  getGoals(goalType : GoalType, goalStatus : GoalStatus){
    return this.http.get<Goal[]>(this.path+`goal/${this.loginService.currentUser.email}?goal_type=${goalType}&goal_status=${goalStatus}`)
  }

  
}
