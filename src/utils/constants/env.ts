import { validateEnv } from './env-validator';

import { Namespace } from '../constants/enums';

export default validateEnv(
  (window as any).env ?? {
    NAMESPACE: Namespace.PRODUCTION,
    FDK_BASE_URI: 'https://demo.fellesdatakatalog.digdir.no',
    SSO_HOST: 'https://sso.demo.fellesdatakatalog.digdir.no',
    SKE_THEME_PROFILE: '910244132',
    FDK_REGISTRATION_BASE_URI: 'https://registrering.demo.fellesdatakatalog.digdir.no',
    ADMIN_GUI_BASE_URI: 'https://admin.demo.fellesdatakatalog.digdir.no',
    ORGANIZATION_API_HOST: 'https://organization-catalog.demo.fellesdatakatalog.digdir.no',
    SEARCH_FULLTEXT_HOST: 'https://search.demo.fellesdatakatalog.digdir.no',
    DATASERVICE_CATALOG_BASE_URI: 'https://dataservice-catalog.demo.fellesdatakatalog.digdir.no',
    CONCEPT_REGISTRATION_HOST: 'https://registrering-begrep.demo.fellesdatakatalog.digdir.no',
    CONCEPT_REGISTRATION_API_HOST: 'https://concept-catalog.demo.fellesdatakatalog.digdir.no',
    RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI: 'https://registrering-protokoll.demo.fellesdatakatalog.digdir.no',
    FDK_COMMUNITY_BASE_URI: 'https://community.demo.fellesdatakatalog.digdir.no/',
    FDK_CMS_BASE_URI: 'https://cms.fellesdatakatalog.digdir.no',
    USE_DEMO_LOGO: false,
  }
);
