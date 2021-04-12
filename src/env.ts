import { validateEnv } from './utils/common';

import { Namespace } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    NAMESPACE: Namespace.DEVELOPMENT,
    FDK_BASE_URI: 'https://staging.fellesdatakatalog.digdir.no',
    SSO_HOST: 'https://sso.staging.fellesdatakatalog.digdir.no',
    SKE_THEME_PROFILE: '910244132',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    REGISTRATION_API_HOST:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    ADMIN_GUI_BASE_URI: 'https://admin.staging.fellesdatakatalog.digdir.no',
    ORGANIZATION_API_HOST:
      'https://organization-catalogue.staging.fellesdatakatalog.digdir.no',
    SEARCH_FULLTEXT_HOST: 'https://search.staging.fellesdatakatalog.digdir.no',
    DATASERVICE_CATALOG_BASE_URI:
      'https://dataservice-catalog.staging.fellesdatakatalog.digdir.no',
    CONCEPT_REGISTRATION_HOST:
      'https://registrering-begrep.staging.fellesdatakatalog.digdir.no',
    CONCEPT_REGISTRATION_API_HOST:
      'https://registrering-begrep-api.fellesdatakatalog.digdir.no',
    RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI:
      'https://registrering-protokoll.staging.fellesdatakatalog.digdir.no',
    RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI:
      'https://registrering-protokoll-api.fellesdatakatalog.digdir.no'
  }
);