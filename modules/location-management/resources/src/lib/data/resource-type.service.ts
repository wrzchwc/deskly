import { Injectable } from '@angular/core';
import { ResourceTypeOld } from '../domain/resources.model';

@Injectable()
export class ResourceTypeService {
  isRoom(type: ResourceTypeOld): boolean {
    const { CONFERENCE_ROOM, PRIVATE_ROOM } = ResourceTypeOld;
    return type === CONFERENCE_ROOM || type === PRIVATE_ROOM;
  }

  isAudioVideoDevice(type: ResourceTypeOld): boolean {
    return type === ResourceTypeOld.AUDIO_VIDEO_DEVICE;
  }

  isObject(type: ResourceTypeOld): boolean {
    return (
      this.isAudioVideoDevice(type) ||
      type === ResourceTypeOld.HOT_DESK ||
      type === ResourceTypeOld.PRIVATE_DESK
    );
  }
}
