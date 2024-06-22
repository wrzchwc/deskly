import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fetchResources,
  removeResource,
  startAddingResources
} from './resources.actions';

@Injectable()
export class ResourcesFacade {
  constructor(private readonly store: Store) {}

  startAddingResources(locationId: string): void {
    this.store.dispatch(startAddingResources({ locationId }));
  }

  fetchResources(locationId: string) {
    this.store.dispatch(fetchResources({ locationId }));
  }

  removeResource(resourceId: string, locationId: string): void {
    this.store.dispatch(removeResource({ resourceId, locationId }));
  }
}
