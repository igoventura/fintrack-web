import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dto_AuthResponse, Dto_RegisterRequest, AuthService as NgOpenapiAuthService } from '../../../api/providers';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends NgOpenapiAuthService {
  private ngOpenapiAuthService = inject(NgOpenapiAuthService);

  login(username: string, password: string, tenantId: string = ""): Observable<Dto_AuthResponse> {
    const headers = new HttpHeaders({
      'X-Tenant-ID': tenantId
    });

    return this.ngOpenapiAuthService.authLoginPost(username, password, 'body', { headers });
  }

  register(request: Dto_RegisterRequest): Observable<Dto_AuthResponse> {
    return this.ngOpenapiAuthService.authRegisterPost(request, 'body');
  }
}
