import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token') || "";

  const router = inject(Router);

  const authService = inject(AuthService);

  if(token != "") {
    return authService.validateToken(token).pipe(
      map(res => {
        if(res.isValid) return true;
        router.navigate(['login']);
        return false;
      }),
      catchError(err => {
        router.navigate(['login']);
        return of(false);
      })
    )
  }else {
    router.navigate(['login']);
    return false;
  }
  
};
