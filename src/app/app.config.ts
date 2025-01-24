import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ActionReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { NavigationEffects } from '@deskly/navigation';
import { AuthEffects, jwtInterceptor } from '@deskly/auth';
import { authReducer } from '@deskly/auth';
import { AUTH_FEATURE_KEY } from '@deskly/auth';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ENVIRONMENT, environment } from '@deskly/environments';

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [AUTH_FEATURE_KEY],
    rehydrate: true,
    removeOnUndefined: true
  })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideStore(
      { router: routerReducer, [AUTH_FEATURE_KEY]: authReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    provideEffects(NavigationEffects, AuthEffects),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: !isDevMode(), maxAge: 25 }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { panelClass: 'deskly-snackbar' }
    },
    { provide: ENVIRONMENT, useValue: environment }
  ]
};
