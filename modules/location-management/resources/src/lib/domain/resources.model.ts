export interface ResourceResponseOld {
  readonly id: string;
  readonly type: ResourceTypeOld;
  readonly name: string;
  readonly photos: string[];
  readonly quantity: number;
  readonly description: string;
  readonly metadata: Partial<Metadata>;
  readonly resourceId: ResourceId;
}

export interface ResourceId {
  readonly id: string;
}

export interface ResourceOld extends ResourceResponseOld {
  readonly locationId: string;
}

export type ResourceKey = Exclude<keyof ResourceOld, 'metadata'>;

export enum ResourceTypeOld {
  HOT_DESK = 'HOT_DESK',
  AUDIO_VIDEO_DEVICE = 'AUDIO_VIDEO_DEVICE',
  PRIVATE_DESK = 'PRIVATE_DESK',
  PRIVATE_ROOM = 'PRIVATE_ROOM',
  CONFERENCE_ROOM = 'CONFERENCE_ROOM'
}

export interface Metadata {
  readonly manufacturer: string; // needed for desks and devices
  readonly model: string; // needed for desks and devices
  readonly serialNumber: string; // needed for devices
  readonly capacity: string; // needed for rooms
}
