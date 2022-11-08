import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ApprovalResolver } from './services/approval.resolver';

const routes: Routes = [
    { path: '', component : ApprovalsComponent, resolve : { approvalResolver : ApprovalResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
