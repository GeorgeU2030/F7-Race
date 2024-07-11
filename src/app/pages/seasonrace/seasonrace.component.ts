import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeasonraceService } from '../../services/seasonrace.service';
import { SeasonBrand } from '../../interfaces/SeasonBrand';
import { SeasonService } from '../../services/season.service';
import { SeasonbrandService } from '../../services/seasonbrand.service';
import { SeasonRaceResponse } from '../../interfaces/SeasonRaceResponse';
import { shuffle } from '../../logic/shuffle';
import { BrandService } from '../../services/brand.service';
import { Podium } from '../../interfaces/Podium';

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

  podium!: Podium[];

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

  loadPodium(){
    if(this.race.firstPosition && this.race.secondPosition
      && this.race.thirdPosition && this.race.fourthPosition && this.race.fifthPosition
      && this.race.sixthPosition && this.race.seventhPosition && this.race.eighthPosition && 
      this.race.ninthPosition && this.race.tenthPosition
    ){
      this.podium = [
        { rank: 1, brand: this.race.firstPosition, points: 25 },
        { rank: 2, brand: this.race.secondPosition, points: 18 },
        { rank: 3, brand: this.race.thirdPosition, points: 15 },
        { rank: 4, brand: this.race.fourthPosition, points: 12 },
        { rank: 5, brand: this.race.fifthPosition, points: 10 },
        { rank: 6, brand: this.race.sixthPosition, points: 8 },
        { rank: 7, brand: this.race.seventhPosition, points: 6 },
        { rank: 8, brand: this.race.eighthPosition, points: 4 },
        { rank: 9, brand: this.race.ninthPosition, points: 2 },
        { rank: 10, brand: this.race.tenthPosition, points: 1 },
      ]
    }
  }

  loadRace(){
    this.seasonRaceService.getRace(this.raceId).subscribe({
      next: (data) => {
        this.race = data;
        this.loadPodium();
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
