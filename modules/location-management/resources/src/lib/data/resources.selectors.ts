import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  adapter,
  RESOURCES_FEATURE_KEY,
  ResourcesState
} from './resources.reducer';
import { ResourceType, Resource } from '../domain/resource';

const selectFeature = createFeatureSelector<ResourcesState>(
  RESOURCES_FEATURE_KEY
);

const { selectAll } = adapter.getSelectors();

const selectResources = createSelector(selectFeature, selectAll);

export const selectConferenceRooms = createSelector(
  selectResources,
  (resources) => filterByType(resources, ResourceType.CONFERENCE_ROOM)
);

export const selectHotDesks = createSelector(selectResources, (resources) =>
  filterByType(resources, ResourceType.DESK)
);

export const selectDevices = createSelector(selectResources, (resources) =>
  filterByType(resources, ResourceType.DEVICE)
);

export const selectPrivateDesks = createSelector(selectResources, (resources) =>
  filterByType(resources, ResourceType.DESK)
);

export const selectPrivateRooms = createSelector(selectResources, (resources) =>
  filterByType(resources, ResourceType.PRIVATE_ROOM)
);

function filterByType(resources: Resource[], type: ResourceType): Resource[] {
  return resources.filter((resource) => resource.type === type);
}
