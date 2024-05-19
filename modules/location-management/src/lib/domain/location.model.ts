export interface Location {
  readonly name: string;
  readonly address: Address;
  readonly hours: Record<WeekDay, [OpeningHours]>
}

interface Address {
  readonly street: string;
  readonly city: string;
  readonly streetNumber: number;
  readonly flatNumber: number | null;
  readonly zipCode: string;
}

type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface OpeningHours {
  readonly start: string;
  readonly finish: string;
}