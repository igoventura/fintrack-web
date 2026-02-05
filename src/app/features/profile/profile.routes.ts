import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from '../../core/guards/auth.guard';
import { tenantGuard } from '../../core/guards/tenant.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authGuard, tenantGuard],
  },
];
