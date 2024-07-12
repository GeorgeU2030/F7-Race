import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../interfaces/Brand';
import { colormain } from '../../styles/colormain';
import { CommonModule } from '@angular/common';
import { carcolor } from '../../styles/carcolor';
import { colorsecondary } from '../../styles/colorsecondary';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {

  brand!: Brand

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService
  ) {}


  getBrandColor(brand: string){
    
    return {
      'background-color': colormain[brand]
    }
  }

  getBorderColor(brand: string){
    return {
      'border': '2px solid ' + colorsecondary[brand]
    }
  }

  getSecondColor(brand: string){
    return {
      'background-color': colorsecondary[brand]
    }
  }

  getCarLogo(brand: string){
    return carcolor[brand];
  }

  loadBrand(id: string){
    const brandId = parseInt(id);
    this.brandService.getBrand(brandId).subscribe({
      next: (data) => {
        this.brand = data;
        console.log(this.brand);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '0';
    this.loadBrand(id);
  }
}
