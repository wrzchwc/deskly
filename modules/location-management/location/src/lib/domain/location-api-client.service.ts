import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CreateLocationConfig, CreateLocationResponse } from './location.model';
import { httpError } from '@deskly/shared/rxjs-operators';
import { Location } from '@deskly/shared/location';
import { LocationApiTransformerService } from './location-api-transformer.service';

@Injectable()
export class LocationApiClientService {
  private readonly httpClient = inject(HttpClient);
  private readonly locationApiTransformer = inject(
    LocationApiTransformerService
  );

  private readonly baseUrl = '/api/location';

  createLocation(
    config: CreateLocationConfig
  ): Observable<Location | undefined> {
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
