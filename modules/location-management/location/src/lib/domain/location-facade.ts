import { Injectable } from '@angular/core';
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
  selectAudioVideoDevices,
  selectPrivateDesks,
  selectPrivateRooms
} from '@deskly/location-management/resources';

@Injectable()
export class LocationFacade {
  readonly previews = this.store.selectSignal(selectLocationPreviews);
  readonly isLoadingInProgress = this.store.selectSignal(isLoadingLocations);
  readonly currentLocation = this.store.selectSignal(selectCurrentLocation);
  readonly currentLocationHotDesks = this.store.selectSignal(
    selectHotDesksForCurrentLocation
  );
  readonly currentLocationConferenceRooms = this.store.selectSignal(
    selectConferenceRoomsForCurrentLocation
  );
  readonly currentLocationAudioVideoDevices = this.store.selectSignal(
    selectAudioVideoDevices
  );
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
}
