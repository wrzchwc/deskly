import { Injectable } from '@angular/core';
import {
  CreateLocationConfig,
  CreateLocationRequest,
  OpeningHours
} from './location.model';
import { WorkDay, Location } from '@deskly/shared/location';

@Injectable()
export class LocationApiTransformerService {
  transformConfigToRequest(value: CreateLocationConfig): CreateLocationRequest {
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

  transformResponseToLocation(
    id: string,
    config: CreateLocationConfig
  ): Location {
    return {
      id: { id },
      name: { name: config.name },
      address: config.address,
      openingHours: {
        week: {
          Monday: this.transformOpeningHoursToDay(config.hours.monday),
          Tuesday: this.transformOpeningHoursToDay(config.hours.tuesday),
          Wednesday: this.transformOpeningHoursToDay(config.hours.wednesday),
          Thursday: this.transformOpeningHoursToDay(config.hours.thursday),
          Friday: this.transformOpeningHoursToDay(config.hours.friday),
          Saturday: this.transformOpeningHoursToDay(config.hours.saturday),
          Sunday: this.transformOpeningHoursToDay(config.hours.sunday)
        }
      }
    };
  }

  private transformOpeningHoursToDay(openingHours: OpeningHours): WorkDay[] {
    return [{ from: openingHours.start, to: openingHours.finish }];
  }
}
