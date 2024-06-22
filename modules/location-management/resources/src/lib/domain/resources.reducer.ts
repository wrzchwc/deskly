import { Resource, ResourceResponse } from './resources.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { addResourceSuccess, fetchResourcesSuccess } from './resources.actions';

export const RESOURCES_FEATURE_KEY = 'location-management/resources';

export type ResourcesState = EntityState<Resource>;

export const adapter: EntityAdapter<Resource> = createEntityAdapter<Resource>();

const initialState = adapter.getInitialState();

export const resourcesReducer = createReducer(
  initialState,
  on(fetchResourcesSuccess, (state, { resources, locationId }) =>
    adapter.upsertMany(
      resources.map((resource) => assignToLocation(resource, locationId)),
      state
    )
  ),
  on(addResourceSuccess, (state, { resource, locationId }) =>
    adapter.addOne(assignToLocation(resource, locationId), state)
  )
);

function assignToLocation(
  resource: ResourceResponse,
  locationId: string
): Resource {
  return {
    ...resource,
    locationId
  };
}
