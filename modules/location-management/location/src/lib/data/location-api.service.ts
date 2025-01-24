import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpError } from '@deskly/shared/rxjs-operators';
import { ENVIRONMENT } from '@deskly/environments';
import { Location } from '../domain/location';
import { ResourceDAO } from '@deskly/location-management/resources';
import {
  CreateLocationRequest,
  CreateLocationResponse
} from '../domain/create-location';

@Injectable()
export class LocationApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  private readonly baseUrl = `${this.environment.apiUrl}/api/v1/deskly-location/location`;

  fetchLocations(): Observable<Location[] | undefined> {
    return this.httpClient
      .get<Location[]>(`${this.baseUrl}s`)
      .pipe(httpError());
  }

  createLocation(
    request: CreateLocationRequest
  ): Observable<CreateLocationResponse | undefined> {
    return this.httpClient
      .post<CreateLocationResponse>(this.baseUrl, request)
      .pipe(httpError());
  }

  fetchLocation(locationId: string): Observable<Location | undefined> {
    return this.httpClient
      .get<Location>(`${this.baseUrl}/${locationId}`)
      .pipe(httpError());
  }

  fetchResourcesAssignedToLocation(
    locationId: string
  ): Observable<ResourceDAO[] | undefined> {
    return this.httpClient
      .get<ResourceDAO[]>(`${this.baseUrl}/${locationId}/resource`)
      .pipe(httpError());
  }

  deleteLocation(locationId: string) {
    return this.httpClient
      .delete(`${this.baseUrl}/${locationId}`)
      .pipe(httpError());
  }
}
