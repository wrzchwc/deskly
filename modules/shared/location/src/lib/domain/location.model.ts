export interface Location {
  readonly id: LocationId;
  readonly name: LocationName;
  readonly address: Address;
  readonly hours: OpeningHoursWeek;
}

interface LocationId {
  readonly id: string;
}

interface LocationName {
  readonly name: string;
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

export type OpeningHoursWeek = [
  { readonly monday: OpeningHours[] },
  { readonly tuesday: OpeningHours[] },
  { readonly wednesday: OpeningHours[] },
  { readonly thursday: OpeningHours[] },
  { readonly friday: OpeningHours[] },
  { readonly saturday: OpeningHours[] },
  { readonly sunday: OpeningHours[] }
];
