import { Address } from '@deskly/shared/location';

export interface OpeningHours {
  readonly start: string;
  readonly finish: string;
}

export type CreateLocationResponse = NonNullable<unknown>;

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

type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
