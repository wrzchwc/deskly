import { Attribute, ResourceType } from './resource';

export interface CreateResourceRequest {
  readonly name: string;
  readonly type: ResourceType;
  readonly attributes: Attribute[];
}

export type CreateResourceResponse = NonNullable<unknown>;