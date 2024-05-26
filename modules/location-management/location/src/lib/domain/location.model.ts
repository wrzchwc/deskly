export interface CreateLocationRequest {
  readonly name: string;
  readonly address: Address;
  readonly hours: Record<WeekDay, [OpeningHours]>;
}

export interface Location {
  readonly id: string;
  readonly name: string;
  readonly address: Address;
  readonly hours: Record<WeekDay, [OpeningHours]>;
}

export interface Address {
  readonly street: string;
  readonly city: string;
  readonly streetNumber: number;
  readonly flatNumber: number | null;
  readonly zipCode: string;
}

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface OpeningHours {
  readonly start: string;
  readonly finish: string;
}

export interface LocationPreview {
  readonly id: string;
  readonly name: string;
  readonly city: string;
}
