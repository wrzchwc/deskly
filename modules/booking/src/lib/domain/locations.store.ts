import { signalStore, withState } from '@ngrx/signals';
import { Location } from '@deskly/location';

interface LocationsState {
  readonly locations: Location[];
  readonly isLoading: boolean;
}

const initialState: LocationsState = {
  locations: [],
  isLoading: false
};

export const LocationsStore = signalStore(withState(initialState));
