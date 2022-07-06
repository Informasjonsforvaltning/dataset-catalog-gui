export enum Namespace {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  DEMO = 'demo',
  PRODUCTION = 'prod'
}

export enum KeyCode {
  TAB = 9,
  ENTER = 13,
  SPACE = 32,
  ARROW_UP = 38,
  ARROW_DOWN = 40
}

export enum RegistrationStatus {
  DRAFT = 'DRAFT',
  APPROVE = 'APPROVE',
  PUBLISH = 'PUBLISH'
}

export enum SearchType {
  DATASET = 'DATASET_BY_QUERY'
}

export enum AdministrativeUnitType {
  NATION = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Nasjon',
  COUNTY = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Fylke',
  MUNICIPALITY = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Kommune'
}

export enum ReferenceDataCode {
  LOS = 'los/themes-and-words',
  THEMES = 'eu/data-themes',
  FREQUENCY = 'eu/frequencies',
  OPEN_LICENCES = 'open-licenses',
  PROVENANCE = 'provenance-statements',
  REFERENCE_TYPES = 'reference-types',
  MEDIA_TYPES = 'iana/media-types'
}
