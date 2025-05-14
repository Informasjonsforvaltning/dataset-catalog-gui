import { Auth } from '.';
import env from '../../utils/constants/env';

const { SSO_HOST } = env;
const OIDC_CLIENT_ID = 'fdk-registration-public';

export const authService = new Auth({
  oidcIssuer: `${SSO_HOST}/auth/realms/fdk`,
  clientId: OIDC_CLIENT_ID,
  redirectUri: location.href,
  logoutRedirectUri: location.href,
});

export default authService;
