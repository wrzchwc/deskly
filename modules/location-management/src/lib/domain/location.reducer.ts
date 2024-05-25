import { createReducer, on } from '@ngrx/store';
import { Location } from './location.model';
import {
  addLocationSuccess,
  deleteLocationSuccess,
  fetchLocations,
  setLocations
} from './location.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const LOCATIONS_FEATURE_KEY = 'location-management/locations';

export interface LocationsState extends EntityState<Location> {
  readonly isLoading: boolean;
}

export const adapter: EntityAdapter<Location> = createEntityAdapter<Location>();

export const initialState = adapter.getInitialState({ isLoading: false });

export const locationsReducer = createReducer(
  initialState,
  on(addLocationSuccess, (state, { location }) =>
    adapter.addOne(location, state)
  ),
  on(setLocations, (state, { locations }) => ({
    ...adapter.setAll(locations, state),
    isLoading: false
  })),
  on(fetchLocations, (state) => ({ ...state, isLoading: true })),
  on(deleteLocationSuccess, (state, { id }) => adapter.removeOne(id, state))
);
