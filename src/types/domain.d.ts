import type {
  RegistrationStatus,
  SearchType,
  AdministrativeUnitType
} from './enums';

export interface MediaType {
  name: string;
  code: string;
}

export interface EnhetsregisteretOrganization {
  organisasjonsnummer: string;
  navn: string;
}

export interface AdministrativeUnit {
  uri: string;
  type: AdministrativeUnitType;
  name: string;
}

export interface SearchResult {
  datasets: Dataset[];
  catalogs: Catalog[];
}

export interface SearchRequest {
  includeExternalDatasets: boolean;
  searchType: SearchType;
  catalogIDs: string[];
  query: string;
  includeStatus?: Set<RegistrationStatus>;
}

export interface Catalog {
  id: string;
  uri: string;
  title: Record<string, string>;
  description: Record<string, string>;
  publisher: Publisher;
  issued: Date;
  modified: Date;
  language: string;
  dataset: Dataset[];
}

export interface Dataset {
  id: string;
  catalogId: string;
  lastModified: Date;
  registrationStatus: RegistrationStatus;
  concepts: Concept[];
  subjects: Subject[];
  uri: string;
  originalUri: string;
  source: string;
  title: Record<string, string>;
  description: Record<string, string>;
  descriptionFormatted: Record<string, string>;
  contactPoint: Contact[];
  keyword: Record<string, string>[];
  publisher: Publisher;
  issued: Date;
  modified: Date;
  language: SkosCode[];
  landingPage: string[];
  theme: DataTheme[];
  distribution: Distribution[];
  sample: Distribution[];
  temporal: PeriodOfTime[];
  spatial: SkosCode[];
  accessRights: SkosCode;
  accessRightsComment: string[];
  legalBasisForRestriction: SkosConcept[];
  legalBasisForProcessing: SkosConcept[];
  legalBasisForAccess: SkosConcept[];
  hasAccuracyAnnotation: QualityAnnotation;
  hasCompletenessAnnotation: QualityAnnotation;
  hasCurrentnessAnnotation: QualityAnnotation;
  hasAvailabilityAnnotation: QualityAnnotation;
  hasRelevanceAnnotation: QualityAnnotation;
  references: Reference[];
  relations: SkosConcept[];
  provenance: SkosCode;
  identifier: string[];
  page: string[];
  accrualPeriodicity: SkosCode;
  subject: Subject[];
  admsIdentifier: string[];
  conformsTo: SkosConcept[];
  informationModel: SkosConcept[];
  qualifiedAttributions: Set<string>;
  type: string;
  catalog: Catalog;
  internal: boolean; // Only used in frontend
}

export interface Concept {
  id: string;
  uri: string;
  identifier: string;
  application: Record<string, string>[];
  definition: Definition;
  alternativeDefinition: Definition;
  subject: Record<string, string>;
  prefLabel: Record<string, string>;
  altLabel: Record<string, string>[];
  hiddenLabel: Record<string, string>[];
  contactPoint: ContactPoint;
  example: Record<string, string>;
}

export interface ContactPoint {
  email: string;
  telephone: string;
}

export interface Definition {
  text: Record<string, string>;
  remark: Record<string, string>;
  source: Source;
  sourceRelationship: string;
  range: TextAndURI;
  sources: TextAndURI[];
  lastUpdated: number;
}

export interface Source {
  uri: string;
  prefLabel: Record<string, string>;
}

export interface TextAndURI {
  text: Record<string, string>;
  uri: string;
}

export interface Contact {
  id: string;
  uri: string;
  fullname: string;
  email: string;
  organizationName: string;
  organizationUnit: string;
  hasURL: string;
  hasTelephone: string;
}

export interface Publisher {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
  prefLabel: Record<string, string>;
}

export interface SkosCode {
  uri: string;
  code: string;
  prefLabel: Record<string, string>;
}

export interface DataTheme {
  id: string;
  uri: string;
  code: string;
  pickedDate: string;
  startUse: string;
  title: Record<string, string>;
  conceptSchema: ConceptSchema;
  numberOfHits: number;
}

export interface Distribution {
  id: string;
  uri: string;
  title: Record<string, string>;
  description: Record<string, string>;
  downloadURL: string[];
  accessURL: string[];
  license: SkosConcept;
  openLicense: boolean;
  conformsTo: SkosConcept[];
  page: SkosConcept[];
  format: string[];
  accessService: DataDistributionService[];
}

export interface PeriodOfTime {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface SkosConcept {
  uri: string;
  prefLabel: Record<string, string>;
  extraType: string;
}

export interface QualityAnnotation {
  inDimension: string;
  motivatedBy: string;
  hasBody: Record<string, string>;
}

export interface Reference {
  referenceType: SkosCode;
}

export interface ConceptSchema {
  id: string;
  title: Record<string, string>;
  versioninfo: string;
  versionnumber: string;
}

export interface DataDistributionService {
  id: string;
  uri: string;
  title: Record<string, string>;
  publisher: Publisher;
  description: Record<string, string>;
  endpointDescription: SkosConcept[];
}

export interface Subject {
  uri: string;
  definition: Record<string, string>;
  prefLabel: Record<string, string>;
  id: string;
  identifier: string;
  altLabel: Record<string, string>[];
  note: Record<string, string>;
  source: string;
  creator: Publisher;
  inScheme: string[];
  datasets: Dataset[];
}
