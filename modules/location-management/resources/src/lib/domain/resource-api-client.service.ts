import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateResourceConfig, Resource } from './resources.model';
import { httpError } from '@deskly/shared/rxjs-operators';

@Injectable()
export class ResourceApiClientService {
  private readonly addResourceUrl = (locationId: string) =>
    `/api/location/${locationId}/resource`;

  constructor(private readonly httpClient: HttpClient) {}

  addResource(config: CreateResourceConfig) {
    const url = this.addResourceUrl(config.locationId);
    return this.httpClient
      .post<Resource | undefined>(url, config.request)
      .pipe(httpError());
  }
}
