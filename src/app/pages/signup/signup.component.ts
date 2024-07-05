import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastAlertService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/User';
import { BrandService } from '../../services/brand.service';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private authService = inject(AuthService);
  private brandService = inject(BrandService);
  private raceService = inject(RaceService);
  private toastAlert = inject(ToastAlertService);

  constructor(
    private router: Router
  ){}

  public formBuild = inject(FormBuilder);

  public formSignup = this.formBuild.group({
    name: ['', Validators.required],
    email: ['' , Validators.required],
    password: ['', [Validators.required, Validators.minLength(7)]]
  });

  signUp(){
    if(this.formSignup.invalid) return;

    const user : User = {
      userId: 0,
      name: this.formSignup.value.name ?? '',
      email: this.formSignup.value.email ?? '',
      password: this.formSignup.value.password ?? '',
      role: ''
    }

    this.authService.signup(user).subscribe({
      next: (data) => {
          this.toastAlert.showSuccess('Success', 'User Created');
          this.brandService.generateBrands(data.userId).subscribe();
          this.raceService.generateRaces(data.userId).subscribe();
          this.router.navigate(['login']);
          
      },
      error: (err) => {
        this.toastAlert.showError('Error', 'User already exist');
      }
    })
  }


}
