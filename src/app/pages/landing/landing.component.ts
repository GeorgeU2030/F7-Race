import { Component } from '@angular/core';
import { cars } from '../../logic/cars';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  public cars = cars;

  constructor() {}
}
