import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeasonraceService } from '../../services/seasonrace.service';
import { SeasonBrand } from '../../interfaces/SeasonBrand';
import { SeasonService } from '../../services/season.service';
import { SeasonbrandService } from '../../services/seasonbrand.service';
import { SeasonRaceResponse } from '../../interfaces/SeasonRaceResponse';
import { shuffle } from '../../logic/shuffle';
import { BrandService } from '../../services/brand.service';

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

  lastraceId!: number;
  race!: SeasonRaceResponse;
  raceId!: number;

  constructor(
    private route: ActivatedRoute,
    private seasonRaceService: SeasonraceService,
    private seasonService: SeasonService,
    private seasonBrandService: SeasonbrandService,
    private brandService: BrandService
  ) { }


  verifyLastRace(){

    if(this.lastraceId == this.raceId){
      const userId = parseInt(localStorage.getItem('userId')?? '0');
      this.brands = this.brands.sort((a, b) => b.points - a.points);
      this.seasonService.podium(this.seasonId,userId, this.brands[0].name, this.brands[1].name, this.brands[2].name).subscribe();
      this.brandService.champion(userId, this.brands[0].name).subscribe();
    }

  }

  updateStats(brand: SeasonBrand, isWinner: boolean){

    const userId = parseInt(localStorage.getItem('userId')?? '0');
    this.brandService.updateStats(userId, brand.name, isWinner).subscribe();

  }

  addPointsHistory(brand: SeasonBrand, points: number){
      
    const userId = parseInt(localStorage.getItem('userId')?? '0');
    this.brandService.updatePoints(userId, brand.name, points).subscribe();

  }

  addTrophies(brandname: string, racename: string){
    const userId = parseInt(localStorage.getItem('userId')?? '0');
    this.brandService.trophies(userId, brandname, racename).subscribe();
  }


  updatePoints(){

    this.brands = shuffle(this.brands);
    
    const points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

    this.brands.slice(0, 10).forEach((brand, index) => {
      brand.points = points[index];
      this.seasonBrandService.updateBrand(brand.seasonBrandId, brand.points).subscribe();
      this.addPointsHistory(brand, points[index]);
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
      next: () => {
        this.loadRace();
        this.verifyLastRace();
        this.updateStats(this.brands[0], true);
        this.updateStats(this.brands[1], false);
        this.updateStats(this.brands[2], false);
        this.addTrophies(this.brands[0].name, this.race.name);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  startRace(){
    this.seasonService.getDetails(this.seasonId).subscribe({
      next: (data) => {
        this.brands = data.brands ?? [];
        if(data.races){
          this.lastraceId = data.races[data.races.length - 1].seasonRaceId;
        }
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
