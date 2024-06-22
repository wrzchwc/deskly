import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { LocationEffects } from './lib/domain/location.effects';
import { LocationApiClientService } from './lib/domain/location-api-client.service';
import { LocationApiTransformerService } from './lib/domain/location-api-transformer.service';
import { provideState } from '@ngrx/store';
import {
  LOCATIONS_FEATURE_KEY,
  locationsReducer
} from './lib/domain/location.reducer';
import {
  ResourcesEffects,
  ResourcesFacade
} from '@deskly/location-management/resources';
import { ResourceApiClientService } from '@deskly/location-management/resources';
import { LocationFacade } from './lib/domain/location-facade';
import {
  RESOURCES_FEATURE_KEY,
  resourcesReducer
} from '@deskly/location-management/resources';

export const LOCATION_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ':locationId',
        loadComponent: async () =>
          (await import('./lib/feature/location-information-page.component'))
            .LocationInformationPageComponent
      },
      {
        path: '',
        loadComponent: async () =>
          (await import('./lib/feature/location-management-page.component'))
            .LocationManagementPageComponent
      }
    ],
    providers: [
      provideState({ name: LOCATIONS_FEATURE_KEY, reducer: locationsReducer }),
      provideState({ name: RESOURCES_FEATURE_KEY, reducer: resourcesReducer }),
      provideEffects(LocationEffects, ResourcesEffects),
      LocationApiClientService,
      LocationApiTransformerService,
      ResourceApiClientService,
      LocationFacade,
      ResourcesFacade
    ]
  }
];
