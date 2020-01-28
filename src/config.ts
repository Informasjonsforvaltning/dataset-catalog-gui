const env = (window as any).env || {
  SEARCH_HOST: 'http://localhost:8080',
  REGISTRATION_API_HOST: 'http://localhost:8114',
  DATASET_API_HOST: 'http://localhost:8114',
  CONCEPT_REGISTRATION_API_HOST: 'http://localhost:8200',
  CONCEPT_REGISTRATION_HOST: 'http://localhost:8202',
  ORGANIZATION_API_HOST: 'http://localhost:8140',
  USE_DEMO_LOGO: false,
  //SSO_HOST: 'http://localhost:8084',
  RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI: 'http://localhost:8142',
  RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI: 'http://localhost:8143',
  REFERENCE_DATA_HOST: 'http://localhost:8112'
};

// override all env variables to it1 (inspired by https://registrering.it1.fellesdatakatalog.brreg.no/config.js)
// env.SEARCH_HOST = 'https://www.it1.fellesdatakatalog.brreg.no';
// env.REGISTRATION_API_HOST = 'https://registrering.it1.fellesdatakatalog.brreg.no';
// env.CONCEPT_REGISTRATION_API_HOST = 'https://registrering-begrep-api.it1.fellesdatakatalog.brreg.no';
// env.CONCEPT_REGISTRATION_HOST = 'https://registrering-begrep.it1.fellesdatakatalog.brreg.no';
 env.SSO_HOST = 'https://sso.it1.fellesdatakatalog.brreg.no';
// env.ORGANIZATION_API_HOST = 'https://organization-catalogue.it1.fellesdatakatalog.brreg.no';
// env.USE_DEMO_LOGO = true;
// env.RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI = 'https://registrering-protokoll.it1.fellesdatakatalog.brreg.no';
// env.RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI = 'https://registrering-protokoll-api.it1.fellesdatakatalog.brreg.no';

const searchHost = env.SEARCH_HOST || 'https://fellesdatakatalog.brreg.no';
const searchApi = {
  host: env.SEARCH_API_HOST || searchHost
};

const defaultToSearchApi = host => (host ? { host } : searchApi);

const config = {
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
    'https://registrering-begrep.fellesdatakatalog.brreg.no',

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
      'https://registrering-begrep-api.fellesdatakatalog.brreg.no'
  },
  organizationApi: {
    host:
      env.ORGANIZATION_API_HOST ||
      'https://organization-catalogue.fellesdatakatalog.brreg.no'
  },
  useDemoLogo: env.USE_DEMO_LOGO || false,
  recordsOfProcessingActivitiesHost:
    env.RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI ||
    'https://registrering-protokoll.fellesdatakatalog.brreg.no',
  recordsOfProcessingActivitiesApi:
    env.RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI ||
    'https://registrering-protokoll-api.fellesdatakatalog.brreg.no'
};

export const getConfig = () => config;
