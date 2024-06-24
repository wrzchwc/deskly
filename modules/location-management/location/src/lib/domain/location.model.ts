import {
  Address,
  OpeningHours,
  OpeningHoursWeek,
  WeekDay
} from '@deskly/shared/location';

export interface CreateLocationRequest {
  readonly name: string;
  readonly address: Address;
  readonly hours: OpeningHoursWeek;
}

export interface CreateLocationResponse {
  readonly id: string;
}

export interface LocationPreview {
  readonly id: string;
  readonly name: string;
  readonly city: string;
}

export interface CreateLocationConfig {
  readonly name: string;
  readonly address: Address;
  readonly hours: Record<WeekDay, OpeningHours>;
}
