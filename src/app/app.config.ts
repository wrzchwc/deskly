import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import {NavigationEffects} from '@deskly/shared/navigation';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideStore({router: routerReducer}),
    provideEffects(NavigationEffects),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: !isDevMode(), maxAge: 25 }),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { panelClass: 'deskly-snackbar' } }
  ]
};
