export interface CreateLocationRequest {
  readonly name: string;
  readonly address: Address;
  readonly hours: Record<WeekDay, [OpeningHours]>;
}

export interface Location extends CreateLocationRequest {
  readonly id: string;
}

interface Address {
  readonly street: string;
  readonly city: string;
  readonly streetNumber: number;
  readonly flatNumber: number | null;
  readonly zipCode: string;
}

type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

interface OpeningHours {
  readonly start: string;
  readonly finish: string;
}
