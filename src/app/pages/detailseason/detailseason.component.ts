import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeasonService } from '../../services/season.service';
import { Season } from '../../interfaces/Season';
import { SeasonBrand } from '../../interfaces/SeasonBrand';
import { SeasonRace } from '../../interfaces/SeasonRace';
import { CommonModule } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    // service
    private seasonService: SeasonService,
  ) { }


  loadSeason(){
    this.seasonService.getDetails(this.seasonId).subscribe({
      next: (data: Season) => {
        this.season = data;
        this.brands = data.brands ?? [];
        this.brands.sort((a, b) => b.points - a.points);
        this.races = data.races ?? [];
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
