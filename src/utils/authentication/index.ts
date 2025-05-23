/* Facade for keycloak */
import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

export interface ResourceRole {
  resource: string;
  resourceId: string;
  role: string;
}

export interface OrganizationRole {
  orgNr: string;
  role: string;
}

export interface AuthConfiguration {
  oidcIssuer: string;
  clientId: string;
  redirectUri: string;
  logoutRedirectUri: string;
}

export interface User {
  username: string;
  name: string;
  fdkTerms: string;
  orgTerms: string[];
}

export class Auth {
  private readonly kc: Keycloak;
  private initialized: boolean;

  constructor(private readonly conf: AuthConfiguration) {
    const [url, realm] = conf.oidcIssuer.split('/realms/');
    const kcConfig = { realm, url, clientId: conf.clientId };

    this.conf = conf;
    this.kc = new Keycloak(kcConfig);
  }

  init: ({ loginRequired }: { loginRequired: boolean }) => Promise<boolean> = async ({ loginRequired }) => {
    const keycloakInitOptions: KeycloakInitOptions = {
      onLoad: 'check-sso',
      checkLoginIframe: false,
    };
    await this.kc
      .init(keycloakInitOptions)
      .then(() => (this.initialized = true))
      .catch(e => console.error('Authentication initialization failed: ', e));
    if (loginRequired && !this.isAuthenticated()) {
      await this.login();
    }
    return this.isAuthenticated();
  };

  login: () => Promise<void> = () =>
    this.kc
      .login()
      .then()
      .catch(e => console.error('Login failure: ', e));

  logout: () => Promise<void> = () =>
    this.kc
      .logout({ redirectUri: this.conf.logoutRedirectUri })
      .then()
      .catch(e => console.error('Logout failure: ', e));

  isAuthenticated: () => boolean = () => this.kc.authenticated || false;

  getUser: () => User = () => ({
    username: this.kc.tokenParsed?.user_name ?? '',
    name: this.kc.tokenParsed?.name ?? '',
    fdkTerms: this.kc.tokenParsed?.fdk_terms ?? '',
    orgTerms: this.kc.tokenParsed?.org_terms.split(',') ?? [],
  });

  getToken: () => Promise<string> = () =>
    this.kc
      .updateToken(30)
      .catch(() => this.logout())
      .then(() => this.kc.token as string);

  getAuthorizationHeader: () => Promise<string> = async () => `Bearer ${await this.getToken()}`;

  getAuthorities: () => string = () => this.kc.tokenParsed?.authorities ?? '';

  getResourceRoles: () => ResourceRole[] = () =>
    this.getAuthorities()
      .split(',')
      .map(authorityDescriptor => authorityDescriptor.split(':'))
      .map(([resource, resourceId, role]) => ({ resource, resourceId, role }));

  hasResourceRole: (resourceRole: ResourceRole) => boolean = ({ resource, resourceId, role }) =>
    !!this.getResourceRoles().find(r => r.resource === resource && r.resourceId === resourceId && r.role === role);

  hasOrganizationRole: (organizationRole: OrganizationRole) => boolean = ({ orgNr, role }) =>
    this.hasResourceRole({ resource: 'organization', resourceId: orgNr, role });

  hasOrganizationReadPermission: (orgNr: string) => boolean = (orgNr: string) =>
    !!this.getResourceRoles().find(({ resource, resourceId }) => resource === 'organization' && resourceId === orgNr);

  hasOrganizationWritePermission = (orgNr: string) => this.hasOrganizationRole({ orgNr, role: 'write' });

  hasOrganizationAdminPermission = (orgNr: string) => this.hasOrganizationRole({ orgNr, role: 'admin' });

  hasSystemAdminPermission = () =>
    this.hasResourceRole({
      resource: 'system',
      resourceId: 'root',
      role: 'admin',
    });

  isInitialized = () => this.initialized;

  hasWritePermission = (orgNr: string | undefined): boolean => {
    if (!orgNr) {
      return false;
    } else {
      return (
        this.hasSystemAdminPermission() ||
        this.hasOrganizationAdminPermission(orgNr) ||
        this.hasOrganizationWritePermission(orgNr)
      );
    }
  };

  hasAcceptedLatestTermsAndConditions = (organizationNumber: string): boolean => {
    const { fdkTerms: latestVersion, orgTerms = [] } = this.getUser();
    return orgTerms.some((t: string) => t === `${organizationNumber}:${latestVersion}`);
  };
}
