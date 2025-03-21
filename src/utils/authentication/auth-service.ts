import { Auth } from '.';
import env from '../../utils/constants/env';

const { FDK_REGISTRATION_BASE_URI, SSO_HOST } = env;
const OIDC_CLIENT_ID = 'fdk-registration-public';

export const authService = new Auth({
  oidcIssuer: `${SSO_HOST}/auth/realms/fdk`,
  clientId: OIDC_CLIENT_ID,
  redirectUri: location.href,
  logoutRedirectUri: location.href,
  silentCheckSsoRedirectUri: `${FDK_REGISTRATION_BASE_URI}/catalogs/silent-check-sso.html`,
});

export default authService;
