export interface CreateLocationRequest {
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly city: string;
  readonly postalCode: string;
  readonly street: string;
  readonly buildingName: string;
  readonly flatNumber: string;
}

export type CreateLocationResponse = NonNullable<unknown>;
