import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailseason',
  standalone: true,
  imports: [],
  templateUrl: './detailseason.component.html',
  styleUrl: './detailseason.component.css'
})
export class DetailseasonComponent implements OnInit{

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const seasonId = this.route.snapshot.paramMap.get('id');
    console.log(seasonId);
  }
}
