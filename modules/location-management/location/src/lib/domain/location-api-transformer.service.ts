import { Injectable } from '@angular/core';
import { CreateLocationConfig, CreateLocationRequest } from './location.model';

@Injectable()
export class LocationApiTransformerService {
  transform(value: CreateLocationConfig): CreateLocationRequest {
    return {
      name: value.name,
      address: value.address,
      hours: [
        { monday: [value.hours.monday] },
        { tuesday: [value.hours.tuesday] },
        { wednesday: [value.hours.wednesday] },
        { thursday: [value.hours.thursday] },
        { friday: [value.hours.friday] },
        { saturday: [value.hours.saturday] },
        { sunday: [value.hours.sunday] }
      ]
    };
  }
}
