import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/entities';
import { slideInAnimation } from '../../user/user/route-animations';
import { MyTeamService } from '../services/my-team.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  animations: [slideInAnimation]
})
export class MemberComponent implements OnInit{

  selectedMember! : User ; 
  memberEmail! : string ; 

  constructor(
    private route : ActivatedRoute,
    private myTeamService : MyTeamService,
    private router : Router
    ){ }
  

  ngOnInit(): void {
    this.route.params.subscribe((params : Params)=>{
      this.memberEmail = params['email'];
    })

    this.myTeamService.getMember(this.memberEmail).subscribe({
      next : (response)=>{
        console.log(response)
        this.selectedMember = response ;
        this.myTeamService.selectedMember = response;
      }, 
      error : (e)=> {
        console.log(e)
        this.router.navigate(['/not-found']);
      }
}); 
  
  }
  
}
