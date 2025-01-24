export interface ResourceDAO {
  readonly id: string;
  readonly name: string;
  readonly type: ResourceType;
  readonly photoUrls: string[];
  readonly attributes: Attribute[];
}

export enum ResourceType {
  DESK = 'DESK',
  CONFERENCE_ROOM = 'CONFERENCE_ROOM',
  PRIVATE_ROOM = 'PRIVATE_ROOM',
  DEVICE = 'DEVICE'
}

export interface Attribute {
  readonly name: AttributeName;
  readonly value: string;
}

export type AttributeName =
  | 'width'
  | 'depth'
  | 'serial number'
  | 'producer'
  | 'quantity'
  | 'description'
  | 'model'
  | 'capacity';

export interface Resource {
  readonly id: string;
  readonly name: string;
  readonly type: ResourceType;
  readonly photoUrls: string[];
  readonly attributes: Record<AttributeName, string | undefined>;
  readonly locationId: string;
}
