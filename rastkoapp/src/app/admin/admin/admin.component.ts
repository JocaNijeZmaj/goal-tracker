import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  navbarOpen = false

  constructor() { }

  toggleNav() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  
}
