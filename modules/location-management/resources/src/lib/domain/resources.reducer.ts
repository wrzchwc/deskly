import { Resource } from './resources.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { fetchResourcesSuccess } from './resources.actions';

export const RESOURCES_FEATURE_KEY = 'location-management/resources';

export type ResourcesState = EntityState<Resource>;

export const adapter: EntityAdapter<Resource> = createEntityAdapter<Resource>();

const initialState = adapter.getInitialState();

export const resourcesReducer = createReducer(
  initialState,
  on(fetchResourcesSuccess, (state, { resources, locationId }) =>
    adapter.upsertMany(
      resources.map((resource) => ({ ...resource, locationId })),
      state
    )
  )
);
