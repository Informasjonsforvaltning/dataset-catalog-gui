export enum KeyCode {
  TAB = 9,
  ENTER = 13,
  SPACE = 32,
  ARROW_UP = 38,
  ARROW_DOWN = 40
}

export enum RegistrationStatus {
  DRAFT = 'draft',
  APPROVE = 'approve',
  PUBLISH = 'publish'
}

export enum SearchType {
  DATASET = 'DATASET_BY_QUERY'
}

export enum AdministrativeUnitType {
  NATION = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Nasjon',
  COUNTY = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Fylke',
  MUNICIPALITY = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Kommune'
}
