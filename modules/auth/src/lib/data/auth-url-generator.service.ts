import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@deskly/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthUrlGenerator {
  private readonly environment = inject(ENVIRONMENT);

  private readonly baseUrl = this.environment.authUrl;
  private readonly clientId = this.environment.clientId;
  private readonly redirectUri = this.environment.redirectUri;

  getSignInUrl() {
    return `${this.baseUrl}/login?client_id=${this.clientId}&response_type=token&scope=email+openid&redirect_uri=${this.redirectUri}`;
  }

  getSignUpUrl() {
    return `${this.baseUrl}/signup?client_id=${this.clientId}&response_type=token&scope=email+openid&redirect_uri=${this.redirectUri}`;
  }

  getSignOutUrl(): string {
    return `${this.baseUrl}/logout?client_id=${this.clientId}&logout_uri=${this.redirectUri}`;
  }
}
