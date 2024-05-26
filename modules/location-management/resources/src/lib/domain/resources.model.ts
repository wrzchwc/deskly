export interface CreateResourceRequest {
  readonly type: ResourceType;
  readonly name: string;
  readonly photos: string[];
  readonly quantity: number; // number of serialNumbers must match this value
  readonly description: string;
  readonly metadata: Partial<Metadata>;
}

export enum ResourceType {
  HOT_DESK = 'HOT_DESK',
  AUDIO_VIDEO_DEVICE = 'AUDIO_VIDEO_DEVICE',
  PRIVATE_DESK = 'PRIVATE_DESK',
  PRIVATE_ROOM = 'PRIVATE_ROOM',
  CONFERENCE_ROOM = 'CONFERENCE_ROOM'
}

interface Metadata {
  readonly manufacturer: string; // needed for desks and devices
  readonly model: string; // needed for desks and devices
  readonly serialNumber: string; // needed for devices
  readonly capacity: string; // needed for rooms
}
