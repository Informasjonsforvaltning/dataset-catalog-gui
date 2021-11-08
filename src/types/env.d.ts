import { Namespace } from './enums';

export interface EnvironmentVariables {
  NAMESPACE: Namespace;
  FDK_BASE_URI: string;
  SSO_HOST: string;
  SKE_THEME_PROFILE: string;
  FDK_REGISTRATION_BASE_URI: string;
  ADMIN_GUI_BASE_URI: string;
  ORGANIZATION_API_HOST: string;
  SEARCH_FULLTEXT_HOST: string;
  DATASERVICE_CATALOG_BASE_URI: string;
  CONCEPT_REGISTRATION_HOST: string;
  CONCEPT_REGISTRATION_API_HOST: string;
  RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI: string;
  FDK_COMMUNITY_BASE_URI: string;
  FDK_CMS_BASE_URI: string;
  USE_DEMO_LOGO: boolean;
}
