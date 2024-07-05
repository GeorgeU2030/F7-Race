import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { ToastAlertService } from '../../services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private toastAlert = inject(ToastAlertService);

  private router = inject(Router);

  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(7)]]
  });

  login(){
    if(this.formLogin.invalid) return;

    const userLogin: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }

    this.authService.login(userLogin).subscribe({
      next: (data) => {
        if(data.token){
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.toastAlert.showSuccess('Success', 'Login Success');
          this.router.navigate(['home']);
        }
      },
      error: (err) => {
        if(err.status == 401){
          this.toastAlert.showError('Error', 'Invalid Credentials');
        }else {
          this.toastAlert.showError('Error', 'The User do not exist');
        }
      }
    })
    
  }

}
