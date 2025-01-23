import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { LocationEffects } from './lib/data/location.effects';
import { LocationApiClientService } from './lib/data/location-api-client.service';
import { LocationApiTransformerService } from './lib/data/location-api-transformer.service';
import { provideState } from '@ngrx/store';
import {
  LOCATIONS_FEATURE_KEY,
  locationsReducer
} from './lib/data/location.reducer';
import {
  ResourcesEffects,
  ResourcesFacade
} from '@deskly/location-management/resources';
import { ResourceApiClientService } from '@deskly/location-management/resources';
import { LocationFacade } from './lib/data/location-facade.service';
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
