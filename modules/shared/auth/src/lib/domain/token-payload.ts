export interface TokenPayload {
  readonly email: string;
  readonly 'cognito:groups'?: UserGroup[];
}

export enum UserGroup {
  LocationManagers = 'location-managers',
  BasicUsers = 'basic-users'
}
