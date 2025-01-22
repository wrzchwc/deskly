import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { signOut } from './auth.actions';
import { isAuthenticated, isManager } from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  readonly isAuthenticated = this.store.selectSignal(isAuthenticated);
  readonly isManager = this.store.selectSignal(isManager);

  constructor(private readonly store: Store) {}

  signOut() {
    this.store.dispatch(signOut());
  }
}
