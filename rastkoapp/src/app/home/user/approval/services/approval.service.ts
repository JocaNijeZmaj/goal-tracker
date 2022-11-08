import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Goal } from 'src/app/entities';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApprovalService {

  private path : string = environment.apiGate; 
  cancelGoal = new Subject<Goal>();
  acceptGoal = new Subject<Goal>();

  constructor(private http: HttpClient,) { }

  approveGoal(goal : Goal){
    const requestBody = { 
      goalId: goal.id,
      action: "APPROVE"
    }
    return this.http.put(this.path+'approval',requestBody);
  }
  declineGoal(goal: Goal){
    const requestBody = { 
      goalId: goal.id,
      action: "DELETE"
    }
    return this.http.put(this.path+'approval',requestBody);
  }

  getRequestedGoals(){
    return this.http.get<Goal[]>(this.path + 'approval');
  }


}
