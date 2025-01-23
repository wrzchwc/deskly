import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  addResourceSuccess,
  fetchResourcesAssignedToCurrentLocationSuccess,
  removeResourceSuccess
} from './resources.actions';
import { AttributeName, Resource, ResourceDAO } from '../domain/resource';

export const RESOURCES_FEATURE_KEY = 'location-management/resources';

export type ResourcesState = EntityState<Resource>;

export const adapter: EntityAdapter<Resource> = createEntityAdapter<Resource>();

const initialState = adapter.getInitialState();

export const resourcesReducer = createReducer(
  initialState,
  on(
    fetchResourcesAssignedToCurrentLocationSuccess,
    (state, { resources, locationId }) =>
      adapter.upsertMany(
        resources.map((resource) => fromDAO(resource, locationId)),
        state
      )
  ),
  on(addResourceSuccess, (state, { resource, locationId }) =>
    // @ts-expect-error: fix this!
    adapter.addOne(fromDAO(resource, locationId), state)
  ),
  on(removeResourceSuccess, (state, { resourceId }) =>
    adapter.removeOne(resourceId, state)
  )
);

function fromDAO(resource: ResourceDAO, locationId: string): Resource {
  return {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    photoUrls: resource.photoUrls,
    locationId,
    attributes: resource.attributes.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.name]: cur.value
      }),
      {} as Record<AttributeName, string>
    )
  };
}
