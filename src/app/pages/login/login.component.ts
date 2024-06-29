import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
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
          this.router.navigate(['home']);
        }else {
          alert('Error al iniciar sesión');
        }
      },
      error: (err) => console.log(err)
    })
    
  }

}
