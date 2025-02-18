import { EnvironmentConfig } from './environment-config';

export const environment: EnvironmentConfig = {
  production: true,
  apiUrl: 'https://o3pm5tkex5.execute-api.us-east-1.amazonaws.com/staging',
  authUrl: 'https://deskly-pwr.auth.us-east-1.amazoncognito.com',
  clientId: '3l4e98v8vcg266c660eqvrag5m',
  redirectUri: 'http://deskly-lb-1156685114.us-east-1.elb.amazonaws.com',
}