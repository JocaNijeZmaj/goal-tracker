import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Goal } from 'src/app/entities';
import { ApprovalService } from './approval.service';

@Injectable()
export class ApprovalResolver implements Resolve<Goal[]> {

  constructor(private approvalService : ApprovalService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Goal[] | Observable<Goal[]> | Promise<Goal[]> {
    return this.approvalService.getRequestedGoals();
  }



}
