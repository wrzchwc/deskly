import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateResourceConfig, ResourceResponse } from './resources.model';
import { httpError } from '@deskly/shared/rxjs-operators';

@Injectable()
export class ResourceApiClientService {
  private readonly addResourceUrl = (locationId: string) =>
    `/api/location/${locationId}/resource`;
  private readonly fetchResourcesUrl = (locationId: string) =>
    `/api/location/${locationId}/resources`;
  private readonly removeResourceUrl = (
    locationId: string,
    resourceId: string
  ) => `/api/location/${locationId}/resource/${resourceId}`;

  constructor(private readonly httpClient: HttpClient) {}

  addResource(config: CreateResourceConfig) {
    const url = this.addResourceUrl(config.locationId);
    return this.httpClient
      .post<ResourceResponse | undefined>(url, config.request)
      .pipe(httpError());
  }

  fetchResources(locationId: string) {
    return this.httpClient
      .get<ResourceResponse[] | undefined>(this.fetchResourcesUrl(locationId))
      .pipe(httpError());
  }

  removeResource(locationId: string, resourceId: string) {
    return this.httpClient
      .delete(this.removeResourceUrl(locationId, resourceId))
      .pipe(httpError());
  }
}
