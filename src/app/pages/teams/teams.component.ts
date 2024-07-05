import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

  constructor (
    private router: Router
  ) {}

  goToRaces(){
    this.router.navigate(['/races']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
  
}
