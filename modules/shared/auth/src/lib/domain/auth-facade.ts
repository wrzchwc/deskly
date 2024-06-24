import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { signIn, signOut, signUp } from './auth.actions';
import { isAuthenticated, isManager } from './auth.selectors';
import { SignUpRequest } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  readonly isAuthenticated = this.store.selectSignal(isAuthenticated);
  readonly isManager = this.store.selectSignal(isManager);

  constructor(private readonly store: Store) {}

  signIn(email: string, password: string) {
    this.store.dispatch(signIn({ email, password }));
  }

  signOut() {
    this.store.dispatch(signOut());
  }

  signUp(data: SignUpRequest) {
    this.store.dispatch(signUp({ request: data }));
  }
}
