import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { EditGoal, Goal, GoalStatus, GoalType, NewGoal, PostFinalReport, User } from 'src/app/entities';
import { environment } from 'src/environments/environment';

@Injectable()
export class MyTeamService {

  selectedMember! : User;
  private path : string = environment.apiGate;
  goalUpdate = new Subject<EditGoal>();
  addedGrade = new Subject<boolean>();

  constructor(private http : HttpClient) { }

  getTeamMembers(){
    return this.http.get<User[]>(this.path+'users');
  }

  getGoals(goalType : GoalType, goalStatus : GoalStatus, memberEmail : string){
    return this.http.get<Goal[]>(this.path+`goal/${memberEmail}?goal_type=${goalType}&goal_status=${goalStatus}`)
  }
  updateGoal(goal: EditGoal){
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

  getMember(email : string){
    return this.http.get<User>(`${this.path}users/${email}`);
  }
  createFinaleReport(FinalReport : PostFinalReport){
    return this.http.post<PostFinalReport>(this.path + 'report', FinalReport);
  }
}
