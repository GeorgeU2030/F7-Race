import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './custom/auth.guard';
import { TeamsComponent } from './pages/teams/teams.component';
import { RacesComponent } from './pages/races/races.component';
import { DetailseasonComponent } from './pages/detailseason/detailseason.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'teams', component: TeamsComponent, canActivate: [authGuard]},
    {path: 'races', component: RacesComponent, canActivate: [authGuard]},
    {path: 'season/:id', component: DetailseasonComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
