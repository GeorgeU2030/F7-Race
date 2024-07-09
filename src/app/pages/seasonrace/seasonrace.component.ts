import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeasonraceService } from '../../services/seasonrace.service';
import { SeasonRace } from '../../interfaces/SeasonRace';
import { SeasonBrand } from '../../interfaces/SeasonBrand';
import { SeasonService } from '../../services/season.service';
import { SeasonbrandService } from '../../services/seasonbrand.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-seasonrace',
  standalone: true,
  imports: [],
  templateUrl: './seasonrace.component.html',
  styleUrl: './seasonrace.component.css'
})
export class SeasonraceComponent implements OnInit{
  
  brands!: SeasonBrand[];
  seasonId!: number;

  race!: SeasonRace;
  raceId!: number;

  constructor(
    private route: ActivatedRoute,
    private seasonRaceService: SeasonraceService,
    private seasonService: SeasonService,
    private seasonBrandService: SeasonbrandService,
  ) { }


  updatePoints(){

    this.brands = this.brands.sort(() => Math.random() - 0.5)
    
    const points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

    this.brands.slice(0, 10).forEach((brand, index) => {
      brand.points = points[index];
      this.seasonBrandService.updateBrand(brand.seasonBrandId, brand.points).subscribe();
    });

    const seasonRace = {
      seasonRaceId: this.race.seasonRaceId,
      seasonId: this.race.seasonId,
      name: this.race.name,
      flagRace: this.race.flagRace,
      laps: this.race.laps,
      imageCircuit: this.race.imageCircuit,
      firstPosition: this.brands[0].seasonBrandId,
      secondPosition: this.brands[1].seasonBrandId,
      thirdPosition: this.brands[2].seasonBrandId,
      fourthPosition: this.brands[3].seasonBrandId,
      fifthPosition: this.brands[4].seasonBrandId,
      sixthPosition: this.brands[5].seasonBrandId,
      seventhPosition: this.brands[6].seasonBrandId,
      eighthPosition: this.brands[7].seasonBrandId,
      ninthPosition: this.brands[8].seasonBrandId,
      tenthPosition: this.brands[9].seasonBrandId
    }

    this.seasonRaceService.updateRace(seasonRace).subscribe({
      error: (error) => {
        console.log(error);
      }
    })

  }


  startRace(){
    this.seasonService.getDetails(this.seasonId).subscribe({
      next: (data) => {
        this.brands = data.brands ?? [];
        this.updatePoints();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  loadRace(){
    this.seasonRaceService.getRace(this.raceId).subscribe({
      next: (data) => {
        this.race = data;
        this.seasonId = data.seasonId;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.raceId = parseInt(this.route.snapshot.paramMap.get('id')!) ;
    this.loadRace();
  }

}
