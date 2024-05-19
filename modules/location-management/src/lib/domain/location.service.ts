import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateLocationRequest, Location } from './location.model';

@Injectable()
export class LocationService {
  private readonly baseUrl = 'localhost:8080/location';

  constructor(private readonly httpClient: HttpClient) {}

  createLocation(request: CreateLocationRequest): Observable<Location> {
    return this.httpClient.post<Location>(this.baseUrl, request);
  }
}
