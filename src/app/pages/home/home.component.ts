import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeasonService } from '../../services/season.service';
import { Season } from '../../interfaces/Season';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  seasons: Season[] = [];

  constructor(
    private router: Router,
    private seasonService: SeasonService
  ) { }

  goToTeams(){
    this.router.navigate(['/teams']);
  }

  goToRaces(){
    this.router.navigate(['/races']);
  }

  addSeason(){
    const userId = parseInt(localStorage.getItem('userId') ?? '0');

    let edition;
    let lastedition;

    if(this.seasons.length > 0){
      lastedition = this.seasons[0].edition;
      edition = lastedition + 1;
    }else {
      edition = 1;
    }

    const season: Season = {
      seasonId: 0,
      edition: edition,
      userId: userId,
    }

    this.seasonService.addSeason(season).subscribe({
      next: (response) => {
        this.seasons.push(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit() {
    const userId = parseInt(localStorage.getItem('userId') ?? '0');
    this.seasonService.getSeasons(userId).subscribe({
      next: (response) => {
        this.seasons = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  
}
