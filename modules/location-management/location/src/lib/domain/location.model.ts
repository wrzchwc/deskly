import { Address } from '@deskly/shared/location';

export interface CreateLocationRequest {
  readonly name: string;
  readonly address: Address;
  readonly hours: Hours;
}

type Hours = [
  { readonly monday: OpeningHours[] },
  { readonly tuesday: OpeningHours[] },
  { readonly wednesday: OpeningHours[] },
  { readonly thursday: OpeningHours[] },
  { readonly friday: OpeningHours[] },
  { readonly saturday: OpeningHours[] },
  { readonly sunday: OpeningHours[] }
];

export interface OpeningHours {
  readonly start: string;
  readonly finish: string;
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

type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
