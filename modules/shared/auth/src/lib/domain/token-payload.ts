export interface TokenPayload {
  readonly 'cognito:groups'?: UserGroup[];
}

export enum UserGroup {
  LocationManagers = 'location-managers',
  BasicUsers = 'basic-users'
}
