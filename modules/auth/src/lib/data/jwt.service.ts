import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../domain/token-payload';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decodeToken(token: string): Observable<TokenPayload | undefined> {
    try {
      return of(jwtDecode<TokenPayload>(token));
    } catch {
      return of(undefined);
    }
  }
}
