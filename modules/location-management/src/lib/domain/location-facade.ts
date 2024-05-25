import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  isLoadingLocations,
  selectLocationPreviews
} from './location.selectors';
import {
  fetchLocations,
  startAddingLocation,
  startDeletingLocation
} from './location.actions';
import { DeleteLocationModalData } from '../ui/delete-location-modal.component';

@Injectable()
export class LocationFacade {
  constructor(private readonly store: Store) {}

  readonly previews = this.store.selectSignal(selectLocationPreviews);

  readonly isLoadingLocations = this.store.selectSignal(isLoadingLocations);

  fetchLocations(): void {
    this.store.dispatch(fetchLocations());
  }

  startAddingLocation(): void {
    this.store.dispatch(startAddingLocation());
  }

  startDeletingLocation(data: DeleteLocationModalData): void {
    this.store.dispatch(startDeletingLocation({ data }));
  }
}
