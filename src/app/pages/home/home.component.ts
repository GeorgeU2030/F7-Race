import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeasonService } from '../../services/season.service';
import { Season } from '../../interfaces/Season';
import { BrandService } from '../../services/brand.service';
import { RaceService } from '../../services/race.service';

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
    private seasonService: SeasonService,
    private brandService: BrandService,
    private raceService: RaceService
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
      next: (response:Season) => {
        this.seasons.push(response);
    
        this.brandService.getBrands(userId).subscribe(brands => {
          brands.forEach( brand => {
            const seasonBrand = {
              seasonBrandId: 0,
              seasonId: response.seasonId,
              name: brand.name,
              logo: brand.logo,
              country: brand.country,
              flag: brand.flag,
              points: 0
            }
            this.seasonService.addTeamtoSeason(response.seasonId, seasonBrand).subscribe({
              error: (err) => {
                console.log(err);
              }
            })
          })
        })
    
        this.raceService.getRaces(userId).subscribe({
          next: (races) => {
            for (let i = races.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [races[i], races[j]] = [races[j], races[i]]; 
            }
    
            const selectedRaces = races.slice(0, 24);
    
            selectedRaces.forEach( race => {
              const seasonRace = {
                seasonRaceId: 0,
                seasonId: response.seasonId,
                name: race.name,
                flagRace: race.flagRace,
                laps: race.laps,
                imageCircuit: race.imageCircuit
              }
              
              this.seasonService.addRaceToSeason(response.seasonId, seasonRace).subscribe({
                error: (err) => {
                  console.log(err);
                }
              })

            })
          },

          error: (err) => console.error(err)
        })
    
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
