import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../interfaces/Brand';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit{

  brands : Brand[] = [];

  constructor (
    private router: Router,
    private brandService: BrandService
  ) {}

  goToRaces(){
    this.router.navigate(['/races']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userId')?? '0');
    this.brandService.getBrands(userId).subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
