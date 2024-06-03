import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { startAddingResources } from './resources.actions';

@Injectable()
export class ResourcesFacade {
  constructor(private readonly store: Store) {}

  startAddingResources(locationId: string): void {
    this.store.dispatch(startAddingResources({ locationId }));
  }
}
