import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreateLocationConfig,
  CreateLocationResponse
} from '../domain/location.model';
import { httpError } from '@deskly/shared/rxjs-operators';
import { LocationApiTransformerService } from './location-api-transformer.service';
import { ENVIRONMENT } from '@deskly/environments';
import { Location } from '../domain/location';

@Injectable()
export class LocationApiClientService {
  private readonly httpClient = inject(HttpClient);
  private readonly locationApiTransformer = inject(
    LocationApiTransformerService
  );
  private readonly environment = inject(ENVIRONMENT);

  private readonly baseUrl = `${this.environment.apiUrl}/api/v1/deskly-location/location`;

  fetchLocations(): Observable<Location[] | undefined> {
    return this.httpClient.get<Location[]>(`${this.baseUrl}s`).pipe(httpError());
  }

  createLocation(
    config: CreateLocationConfig
  ): Observable<Location | undefined> {
    // @ts-expect-error fix this!
    return this.httpClient
      .post<CreateLocationResponse>(
        this.baseUrl,
        this.locationApiTransformer.transformConfigToRequest(config)
      )
      .pipe(
        map(({ id }) =>
          this.locationApiTransformer.transformResponseToLocation(id, config)
        ),
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
