import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CreateLocationConfig, CreateLocationResponse } from './location.model';
import { LocationApiTransformerService } from './location-api-transformer.service';
import { httpError } from '@deskly/shared/rxjs-operators';
import { Location } from '@deskly/shared/location';

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
      .post<CreateLocationResponse>(this.baseUrl, request)
      .pipe(
        map(({ id }) => ({
          ...request,
          id: { id },
          name: { name: request.name }
        })),
        httpError()
      );
  }

  fetchLocation(locationId: string): Observable<Location | undefined> {
    return this.httpClient
      .get<Location>(`${this.baseUrl}/${locationId}`)
      .pipe(httpError());
  }

  deleteLocation(locationId: string) {
    return this.httpClient
      .delete(`${this.baseUrl}/${locationId}`)
      .pipe(httpError());
  }
}
