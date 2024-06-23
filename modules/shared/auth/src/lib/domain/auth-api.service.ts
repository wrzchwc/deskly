import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpError } from '@deskly/shared/rxjs-operators';
import { map } from 'rxjs';
import { AUTH_HEADER, SignUpRequest } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly baseUrl = '/api';

  constructor(private readonly httpClient: HttpClient) {}

  signIn(email: string, password: string) {
    return this.httpClient
      .post<Response>(
        `${this.baseUrl}/login`,
        { email, password },
        { observe: 'response' }
      )
      .pipe(
        map(({ headers }) => headers.get(AUTH_HEADER)),
        httpError()
      );
  }

  signOut() {
    return this.httpClient
      .post(`${this.baseUrl}/logout`, {}, { responseType: 'text' })
      .pipe(httpError());
  }

  signUp(request: SignUpRequest) {
    return this.httpClient
      .post(`${this.baseUrl}/users`, request)
      .pipe(httpError());
  }
}
