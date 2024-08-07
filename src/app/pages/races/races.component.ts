import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaceService } from '../../services/race.service';
import { Race } from '../../interfaces/Race';

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [],
  templateUrl: './races.component.html',
  styleUrl: './races.component.css'
})
export class RacesComponent implements OnInit {

  races: Race[] = [];

  constructor (
    private router: Router,
    private raceService: RaceService
  ) {}

  goToTeams(){
    this.router.navigate(['/teams']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  ngOnInit(){
    const userId = parseInt(localStorage.getItem('userId')?? '0');
    this.raceService.getRaces(userId).subscribe({
      next: (data) => {
        this.races = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
