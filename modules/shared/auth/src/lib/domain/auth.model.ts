export interface TokenPayload {
  readonly sub: string;
  readonly role: UserRole;
  readonly iat: number;
}

export enum UserRole {
  MANAGER = 'MANAGER',
  TENANT = 'TENANT'
}

export const AUTH_HEADER = 'Authorization';

export interface SignUpRequest {
  readonly email: string;
  readonly password: string;
  readonly userType: UserRole;
  readonly name: string;
  readonly surname: string;
}
