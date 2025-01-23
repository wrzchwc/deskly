import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentLocation,
  isLoadingLocations,
  selectLocationPreviews,
  selectHotDesksForCurrentLocation,
  selectConferenceRoomsForCurrentLocation
} from './location.selectors';
import {
  fetchLocation,
  fetchLocations,
  startAddingLocation,
  startDeletingLocation
} from './location.actions';
import { DeleteLocationModalData } from '../ui/delete-location-modal.component';
import {
  fetchResourcesAssignedToCurrentLocation,
  selectDevices,
  selectPrivateDesks,
  selectPrivateRooms
} from '@deskly/location-management/resources';
import { Location } from '../domain/location';

@Injectable()
export class LocationFacade {
  readonly previews = this.store.selectSignal(selectLocationPreviews);
  readonly isLoadingInProgress = this.store.selectSignal(isLoadingLocations);
  readonly currentLocation: Signal<Location | undefined> =
    this.store.selectSignal(selectCurrentLocation);
  readonly currentLocationHotDesks = this.store.selectSignal(
    selectHotDesksForCurrentLocation
  );
  readonly currentLocationConferenceRooms = this.store.selectSignal(
    selectConferenceRoomsForCurrentLocation
  );
  readonly currentLocationAudioVideoDevices =
    this.store.selectSignal(selectDevices);
  readonly currentLocationPrivateDesks =
    this.store.selectSignal(selectPrivateDesks);
  readonly currentLocationPrivateRooms =
    this.store.selectSignal(selectPrivateRooms);

  constructor(private readonly store: Store) {}

  fetchLocations(): void {
    this.store.dispatch(fetchLocations());
  }

  fetchLocation(locationId: string): void {
    this.store.dispatch(fetchLocation({ locationId }));
  }

  startAddingLocation(): void {
    this.store.dispatch(startAddingLocation());
  }

  startDeletingLocation(data: DeleteLocationModalData): void {
    this.store.dispatch(startDeletingLocation({ data }));
  }

  fetchResourcesAssignedToCurrentLocation(): void {
    this.store.dispatch(fetchResourcesAssignedToCurrentLocation());
  }
}
