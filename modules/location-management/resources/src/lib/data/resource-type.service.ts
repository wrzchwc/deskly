import { Injectable } from '@angular/core';
import { ResourceType } from '../domain/resource';

@Injectable({ providedIn: 'root' })
export class ResourceTypeService {
  isRoom(type: ResourceType): boolean {
    const { CONFERENCE_ROOM, PRIVATE_ROOM } = ResourceType;
    return type === CONFERENCE_ROOM || type === PRIVATE_ROOM;
  }

  isAudioVideoDevice(type: ResourceType): boolean {
    return type === ResourceType.DEVICE;
  }

  isObject(type: ResourceType): boolean {
    return this.isAudioVideoDevice(type) || type === ResourceType.DESK;
  }
}
