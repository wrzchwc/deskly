import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { startAddingResources } from './resources.actions';

@Injectable()
export class ResourcesFacade {
  constructor(private readonly store: Store) {}

  startAddingResources(): void {
    this.store.dispatch(startAddingResources());
  }
}
