import { createReducer, on } from '@ngrx/store';
import {
  deleteLocationSuccess,
  fetchLocation,
  fetchLocationFailure,
  fetchLocations,
  fetchLocationSuccess,
  setLocations
} from './location.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Location } from '../domain/location';

export const LOCATIONS_FEATURE_KEY = 'location-management/locations';

export interface LocationsState extends EntityState<Location> {
  readonly isLoading: boolean;
  readonly selectedLocationId?: string;
}

export const adapter: EntityAdapter<Location> = createEntityAdapter<Location>();

const initialState = adapter.getInitialState({
  isLoading: false
});

export const locationsReducer = createReducer(
  initialState,
  on(setLocations, (state, { locations }) => ({
    ...adapter.upsertMany(locations, state),
    isLoading: false
  })),
  on(fetchLocations, (state) => ({ ...state, isLoading: true })),
  on(deleteLocationSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(fetchLocationSuccess, (state, { location }) => ({
    ...adapter.upsertOne(location, state),
    isLoading: false
  })),
  on(fetchLocation, (state, { locationId }) => ({
    ...state,
    isLoading: true,
    selectedLocationId: locationId
  })),
  on(fetchLocationFailure, (state) => ({ ...state, isLoading: false }))
);
