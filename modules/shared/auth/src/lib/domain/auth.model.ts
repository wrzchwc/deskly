export interface TokenPayload {
  readonly sub: string;
  readonly iat: number;
  readonly exp: number;
  readonly auth: Auths;
}

export type Auths = Auth[];

interface Auth {
  readonly authority: Authority;
}

export enum Authority {
  MANAGER = 'FACILITY_MANAGER',
  TENANT = 'TENANT'
}

export const AUTH_HEADER = 'Authorization';
