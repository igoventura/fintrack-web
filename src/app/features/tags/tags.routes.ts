import { Routes } from '@angular/router';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { authGuard } from '../../core/guards/auth.guard';
import { tenantGuard } from '../../core/guards/tenant.guard';

export const TAGS_ROUTES: Routes = [
  {
    path: '', // /tags
    component: TagListComponent,
    canActivate: [authGuard, tenantGuard],
  },
];
