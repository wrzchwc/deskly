import { inject, Injectable, signal } from '@angular/core';
import { ENVIRONMENT } from '@deskly/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthUrlGenerator {
  private readonly environment = inject(ENVIRONMENT);

  private readonly baseUrl = this.environment.authUrl;
  private readonly clientId = this.environment.clientId;
  private readonly redirectUri = this.environment.redirectUri;

  readonly signInUrl = signal(
    `${this.baseUrl}/login?client_id=${this.clientId}&response_type=token&scope=email+openid&redirect_uri=${this.redirectUri}`
  ).asReadonly();

  readonly signUpUrl = signal(
    `${this.baseUrl}/signup?client_id=${this.clientId}&response_type=token&scope=email+openid&redirect_uri=${this.redirectUri}`
  ).asReadonly();
}
