import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from './auth.selectors';
import { Observable, tap } from 'rxjs';
import { navigateToPage, Route } from '@deskly/navigation';

export function authGuard(): Observable<boolean> {
  const store = inject(Store);
  return store.select(isAuthenticated).pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        store.dispatch(navigateToPage({ route: Route.HOME }));
      }
    })
  );
}
