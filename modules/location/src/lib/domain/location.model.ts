export interface Location {
  readonly id: LocationId;
  readonly name: LocationName;
  readonly address: Address;
  readonly openingHours: OpeningHours;
}

interface LocationId {
  readonly id: string;
}

interface LocationName {
  readonly name: string;
}

interface Address {
  readonly street: string;
  readonly city: string;
  readonly streetNumber: number;
  readonly flatNumber: number | null;
  readonly zipCode: string;
}

interface OpeningHours {
  readonly week: Week;
}

interface Week {
  readonly Monday: WorkDay[];
  readonly Tuesday: WorkDay[];
  readonly Wednesday: WorkDay[];
  readonly Thursday: WorkDay[];
  readonly Friday: WorkDay[];
  readonly Saturday: WorkDay[];
  readonly Sunday: WorkDay[];
}

export interface WorkDay {
  readonly from: string;
  readonly to: string;
}
