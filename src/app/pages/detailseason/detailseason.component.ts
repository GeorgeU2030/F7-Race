import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonService } from '../../services/season.service';
import { Season } from '../../interfaces/Season';
import { SeasonBrand } from '../../interfaces/SeasonBrand';
import { SeasonRace } from '../../interfaces/SeasonRace';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-detailseason',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailseason.component.html',
  styleUrl: './detailseason.component.css'
})
export class DetailseasonComponent implements OnInit{

  seasonId!: number;
  season!: Season;
  brands!: SeasonBrand[];
  races!: SeasonRace[];
  lastrace!: SeasonRace;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // service
    private seasonService: SeasonService,
    private brandService: BrandService
  ) { }

  goToRace(raceId: number){
    this.router.navigate(['/race', raceId])
  }

  finish(){
    this.brands.sort((a, b) => b.points - a.points);
    const userid = parseInt(localStorage.getItem('userId') ?? '0');
    this.seasonService.podium(this.seasonId,userid, this.brands[0].name, this.brands[1].name, this.brands[2].name).subscribe();
    this.brandService.champion(userid, this.brands[0].name).subscribe();
    this.router.navigate(['/home']);
  }

  loadSeason(){
    this.seasonService.getDetails(this.seasonId).subscribe({
      next: (data: Season) => {
        this.season = data;
        this.brands = data.brands ?? [];
        this.brands.sort((a, b) => b.points - a.points);
        this.races = data.races ?? [];
        if(data.races){
          this.lastrace = data.races[data.races.length - 1];
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  ngOnInit(): void {
    this.seasonId = parseInt(this.route.snapshot.paramMap.get('id')!) ;
    this.loadSeason();
  }
}
