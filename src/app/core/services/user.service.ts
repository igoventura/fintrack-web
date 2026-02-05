import { Injectable, inject, signal } from '@angular/core';
import { UsersService as ApiUsersService } from '../../../api/providers/services/users.service';
import { Dto_UpdateUserRequest, Dto_UserResponse } from '../../../api/providers/models';
import { ToastService } from './toast.service';
import { tap } from 'rxjs';

/**
 * Service to manage user profile state and operations.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUsersService = inject(ApiUsersService);
  private toast = inject(ToastService);

  readonly userProfile = signal<Dto_UserResponse | null>(null);

  /**
   * Fetch the current user's profile from the API.
   * Updates the userProfile signal.
   */
  loadProfile() {
    return this.apiUsersService.usersProfileGet().pipe(
      tap({
        next: (profile) => this.userProfile.set(profile),
        error: () => this.toast.error('Failed to load user profile'),
      }),
    );
  }

  /**
   * Update the user's profile.
   * @param data The partial update data
   */
  updateProfile(data: Dto_UpdateUserRequest) {
    return this.apiUsersService.usersProfilePut(data).pipe(
      tap({
        next: (updatedProfile) => {
          this.userProfile.set(updatedProfile);
          this.toast.success('Profile updated successfully');
        },
        error: () => this.toast.error('Failed to update profile'),
      }),
    );
  }
}
