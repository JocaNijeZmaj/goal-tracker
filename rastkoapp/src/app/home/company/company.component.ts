import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyUser } from 'src/app/entities';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  searchText = '';
  companyArray! : CompanyUser[] ;
  getCompanySubscription! : Subscription; 

  constructor( private teamService : TeamService ) { }

  ngOnInit(): void {
    this.getCompanySubscription = this.teamService.getAllCompany().subscribe({
      next: (response : CompanyUser[] ) => {
        console.log(response);
        this.companyArray = response ; 
    },
    error: error => {
        console.error('There was an error!', error);
    }
    });
  }

}
