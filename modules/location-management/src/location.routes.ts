import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { LocationEffects } from './lib/domain/location.effects';
import { LocationApiClientService } from './lib/domain/location-api-client.service';
import { LocationApiTransformerService } from './lib/domain/location-api-transformer.service';

export const LOCATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./lib/feature/location-management-page.component'))
        .LocationManagementPageComponent,
    providers: [
      provideEffects(LocationEffects),
      LocationApiClientService,
      LocationApiTransformerService
    ]
  }
]