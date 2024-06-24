import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location.model';
import { httpError } from '@deskly/shared/rxjs-operators';

@Injectable({
  providedIn: 'root'
})
export class LocationApiClientService {
  private readonly baseUrl = '/api/location';

  constructor(private readonly httpClient: HttpClient) {}

  fetchLocations(): Observable<Location[] | undefined> {
    return this.httpClient.get<Location[]>(this.baseUrl).pipe(httpError());
  }
}
