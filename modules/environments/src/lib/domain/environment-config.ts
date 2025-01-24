export interface EnvironmentConfig {
  readonly production: boolean;
  readonly apiUrl: string;
  readonly authUrl: string;
  readonly clientId: string;
  readonly redirectUri: string;
}