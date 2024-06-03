import { Injectable } from '@angular/core';
import {
  CreateLocationConfig,
  CreateLocationRequest,
  OpeningHours,
  WeekDay
} from './location.model';

@Injectable()
export class LocationApiTransformerService {
  transform(value: CreateLocationConfig): CreateLocationRequest {
    return {
      name: value.name,
      address: value.address,
      hours: this.transformOpeningHours(value.hours)
    };
  }

  private transformOpeningHours(
    openingHours: Record<WeekDay, OpeningHours>
  ): Record<WeekDay, [OpeningHours]> {
    const days = Object.keys(openingHours) as WeekDay[];
    return days.reduce(
      (acc, day) => ({
        ...acc,
        [day]: [openingHours[day]]
      }),
      {} as Record<WeekDay, [OpeningHours]>
    );
  }
}
