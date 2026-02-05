import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { authGuard } from '../../core/guards/auth.guard';
import { tenantGuard } from '../../core/guards/tenant.guard';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '', // /categories
    component: CategoryListComponent,
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: 'new', // /categories/new
    component: CategoryFormComponent,
    canActivate: [authGuard, tenantGuard],
  },
  {
    path: ':id/edit', // /categories/:id/edit
    component: CategoryFormComponent,
    canActivate: [authGuard, tenantGuard],
  },
];
