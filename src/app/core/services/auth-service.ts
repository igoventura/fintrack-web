import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService as NgOpenapiAuthService } from '../../../api/providers/services';
import { Dto_AuthResponse } from '../../../api/providers';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends NgOpenapiAuthService {
  private http = inject(HttpClient);
  private ngOpenapiAuthService = inject(NgOpenapiAuthService);

  login(username: string, password: string): Observable<Dto_AuthResponse> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);

    return this.ngOpenapiAuthService.authLoginPost(username, password, 'body');
  }
}
