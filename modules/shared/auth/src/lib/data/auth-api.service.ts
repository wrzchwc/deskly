import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly baseUrl = '/api';

  constructor(private readonly httpClient: HttpClient) {}

  signOut() {
    return this.httpClient.post(`${this.baseUrl}/logout`, null);
  }
}
