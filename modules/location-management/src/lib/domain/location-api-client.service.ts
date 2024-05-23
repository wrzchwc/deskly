import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location.model';
import { CreateLocationConfig } from '../ui/create-location-modal.component';
import { LocationApiTransformerService } from './location-api-transformer.service';

@Injectable()
export class LocationApiClientService {
  private readonly baseUrl = '/api/location';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly locationApiTransformer: LocationApiTransformerService
  ) {}

  createLocation(config: CreateLocationConfig): Observable<Location> {
    const request = this.locationApiTransformer.transform(config);
    return this.httpClient.post<Location>(this.baseUrl, request);
  }
}
