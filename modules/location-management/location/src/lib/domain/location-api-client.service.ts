import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location.model';
import { CreateLocationConfig } from '../ui/create-location-modal.component';
import { LocationApiTransformerService } from './location-api-transformer.service';
import { httpError } from '@deskly/shared/rxjs-operators';

@Injectable()
export class LocationApiClientService {
  private readonly baseUrl = '/api/location';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly locationApiTransformer: LocationApiTransformerService
  ) {}

  createLocation(
    config: CreateLocationConfig
  ): Observable<Location | undefined> {
    const request = this.locationApiTransformer.transform(config);
    return this.httpClient
      .post<Location>(this.baseUrl, request)
      .pipe(httpError());
  }

  fetchLocations(): Observable<Location[] | undefined> {
    return this.httpClient
      .get<Location[]>(`${this.baseUrl}s`)
      .pipe(httpError());
  }

  deleteLocation(locationId: string) {
    return this.httpClient
      .delete(`${this.baseUrl}/${locationId}`)
      .pipe(httpError());
  }
}
