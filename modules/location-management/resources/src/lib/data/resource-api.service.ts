import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpError } from '@deskly/shared/rxjs-operators';
import { ENVIRONMENT } from '@deskly/environments';
import {
  CreateResourceRequest,
  CreateResourceResponse
} from '../domain/create-resource';
import { Observable } from 'rxjs';

@Injectable()
export class ResourceApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  private readonly removeResourceUrl = (
    locationId: string,
    resourceId: string
  ) => `/api/location/${locationId}/resource/${resourceId}`;

  addResource(
    request: CreateResourceRequest
  ): Observable<CreateResourceResponse | undefined> {
    return this.httpClient
      .post<CreateResourceResponse>(
        `${this.environment.apiUrl}/api/v1/deskly-location/resource`,
        request
      )
      .pipe(httpError());
  }

  removeResource(locationId: string, resourceId: string) {
    return this.httpClient
      .delete(this.removeResourceUrl(locationId, resourceId))
      .pipe(httpError());
  }
}
