import { Namespace } from './enums';

const env = (window as any).env || {
  NAMESPACE: Namespace.STAGING,
  SEARCH_HOST: 'http://localhost:8080',
  REGISTRATION_API_HOST: 'http://localhost:8098',
  CONCEPT_REGISTRATION_API_HOST: 'http://localhost:8200',
  CONCEPT_REGISTRATION_HOST: 'http://localhost:8202',
  ORGANIZATION_API_HOST: 'http://localhost:8140',
  USE_DEMO_LOGO: false,
  SSO_HOST: 'http://localhost:8084',
  // todo given that the it uses the same port as the organization-api, no-one has ever tried to run these services together. Update when this need arises
  RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI: 'http://localhost:8140',
  RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI: 'http://localhost:8141',
  DATASERVICE_CATALOG_BASE_URI: 'http://localhost:9080'
};

// override all env variables to staging (inspired by https://registrering.staging.fellesdatakatalog.digdir.no/config.js)
// env.SEARCH_HOST = 'https://www.staging.fellesdatakatalog.digdir.no';
// env.REGISTRATION_API_HOST =
//   'https://registrering.staging.fellesdatakatalog.digdir.no';
// env.CONCEPT_REGISTRATION_API_HOST =
//   'https://registrering-begrep-api.staging.fellesdatakatalog.digdir.no';
// env.CONCEPT_REGISTRATION_HOST =
//   'https://registrering-begrep.staging.fellesdatakatalog.digdir.no';
// env.SSO_HOST = 'https://sso.staging.fellesdatakatalog.digdir.no';
// env.ORGANIZATION_API_HOST =
//   'https://organization-catalogue.staging.fellesdatakatalog.digdir.no';
// env.USE_DEMO_LOGO = true;
// env.RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI =
//   'https://registrering-protokoll.staging.fellesdatakatalog.digdir.no';
// env.RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI =
//   'https://registrering-protokoll.staging.fellesdatakatalog.digdir.no';
// env.DATASERVICE_CATALOG_BASE_URI =
//   'https://dataservice-catalog.staging.fellesdatakatalog.digdir.no';
// env.SEARCH_FULLTEXT_HOST = 'https://search.staging.fellesdatakatalog.digdir.no';
// env.SKE_THEME_PROFILE = '910244132';

const searchHost = env.SEARCH_HOST || 'https://fellesdatakatalog.digdir.no';
const searchApi = {
  host: env.SEARCH_API_HOST || searchHost,
  // in ut1 and st1, search api requires basic authentication
  authorization: env.SEARCH_API_AUTHORIZATION || undefined
};

const defaultToSearchApi = host => (host ? { host } : searchApi);

const config = {
  namespace: env.NAMESPACE,
  store: { useLogger: env.REDUX_LOG === 'true' },
  registrationLanguage: env.REGISTRATION_LANGUAGE || 'nb',
  auth: {
    oidcIssuer: `${env.SSO_HOST}/auth/realms/fdk`,
    oidcClientId: 'fdk-registration-public'
  },

  // frontend hosts
  searchHost,
  conceptRegistrationHost:
    env.CONCEPT_REGISTRATION_HOST ||
    'https://registrering-begrep.fellesdatakatalog.digdir.no',

  // api modules
  referenceDataApi: defaultToSearchApi(env.REFERENCE_DATA_HOST),
  apiApi: defaultToSearchApi(env.API_API_HOST),
  datasetApi: defaultToSearchApi(env.DATASET_API_HOST),
  conceptApi: defaultToSearchApi(env.CONCEPT_API_HOST),
  // default configuration runs in cluster through proxy, assuming frontend comes from the same origin
  registrationApi: { host: env.REGISTRATION_API_HOST || '' },
  conceptRegistrationApi: {
    host:
      env.CONCEPT_REGISTRATION_API_HOST ||
      'https://registrering-begrep-api.fellesdatakatalog.digdir.no'
  },
  organizationApi: {
    host:
      env.ORGANIZATION_API_HOST ||
      'https://organization-catalogue.fellesdatakatalog.digdir.no'
  },
  useDemoLogo: env.USE_DEMO_LOGO || false,
  recordsOfProcessingActivitiesHost:
    env.RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI ||
    'https://registrering-protokoll.fellesdatakatalog.digdir.no',
  recordsOfProcessingActivitiesApi:
    env.RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI ||
    'https://registrering-protokoll-api.fellesdatakatalog.digdir.no',
  dataServiceCatalogHost:
    env.DATASERVICE_CATALOG_BASE_URI ||
    'https://dataservice-catalog.fellesdatakatalog.digdir.no',
  searchFullTextApi:
    { host: env.SEARCH_FULLTEXT_HOST } ||
    'https://search.fellesdatakatalog.digdir.no',
  skeThemeProfile: env.SKE_THEME_PROFILE
};

export const getConfig = () => config;
