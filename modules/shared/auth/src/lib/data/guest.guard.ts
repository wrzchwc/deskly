import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from './auth.selectors';
import { map, Observable, tap } from 'rxjs';
import { navigateToPage, Route } from '@deskly/shared/navigation';

export function guestGuard(): Observable<boolean> {
  const store = inject(Store);
  return store.select(isAuthenticated).pipe(
    map((isAuthenticated) => !isAuthenticated),
    tap((isGuest) => {
      if (!isGuest) {
        store.dispatch(navigateToPage({ route: Route.LANDING_PAGE }));
      }
    })
  );
}
