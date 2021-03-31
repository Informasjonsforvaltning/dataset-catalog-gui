import type { UserManagerSettings } from 'oidc-client';

import env from '../../env';

const { SSO_HOST, FDK_REGISTRATION_BASE_URI } = env;

const userManagerSettings: UserManagerSettings = {
  authority: `${SSO_HOST}/auth/realms/fdk`,
  client_id: 'fdk-registration-public',
  redirect_uri: `${location.origin}/auth`,
  post_logout_redirect_uri: FDK_REGISTRATION_BASE_URI,
  response_type: 'code',
  scope: 'openid authorities profile email',
  revokeAccessTokenOnSignout: true
};

export default userManagerSettings;
