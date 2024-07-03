import { Component } from '@angular/core';
import { cars } from '../../logic/cars';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  public cars = cars;

  constructor(
    private router: Router
  ) {}

  goToLogin(){
    this.router.navigate(['/login']);
  }

  goToRegister(){
    this.router.navigate(['/signup']);
  }
}
