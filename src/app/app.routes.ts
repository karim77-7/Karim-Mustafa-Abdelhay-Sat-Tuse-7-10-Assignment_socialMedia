import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';

import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './featuers/home/home.component';
import { NotFoundComponent } from './featuers/not-found/not-found.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { noauthGuard } from './core/guards/noauth/noauth-guard';
import { PostDetailsComponent } from './featuers/post-details/post-details.component';
import { ProfileComponent } from './featuers/profile/profile.component';
import { SettingsComponent } from './shared/components/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [noauthGuard],
    children: [
      { path: 'login', component: LoginComponent },

      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'post-details/:id', component: PostDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
