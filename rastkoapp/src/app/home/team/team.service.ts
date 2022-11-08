import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyUser, EditGoal, Goal, GoalStatus, GoalType, NewGoal, User } from 'src/app/entities';
import { environment } from 'src/environments/environment';

@Injectable()
export class TeamService {

  selectedMember! : User; 
  private path : string = environment.apiGate; 
  // private companyPath = "https://user-service.interns.sbgpoc.com/";

  constructor(private http : HttpClient) { }

  getTeamMembers(){
    return this.http.get<User[]>(this.path+'users');
  }

  getGoals(goalType : GoalType, goalStatus : GoalStatus, memberEmail : string){
    return this.http.get<Goal[]>(this.path+`goal/${memberEmail}?goal_type=${goalType}&goal_status=${goalStatus}`)
  }
  updateGoal(goal: EditGoal){

  }
  createGoal(newGoal : NewGoal){
    return this.http.post<Goal>(this.path + 'goal', newGoal);
  }
  getAllCompany(){
    return this.http.get<CompanyUser[]>(this.path+'users/info');
  }
}