import {
  LIST_ORGANIZATIONS_REQUESTED,
  LIST_ORGANIZATIONS_SUCCEEDED,
  LIST_ORGANIZATIONS_FAILED,
  SEARCH_ORGANIZATIONS_REQUESTED,
  SEARCH_ORGANIZATIONS_SUCCEEDED,
  SEARCH_ORGANIZATIONS_FAILED
} from './actions-types';

import type { EnhetsregisteretOrganization } from '../../../types';

export function listOrganizationsRequested(ids: string[]) {
  return {
    type: LIST_ORGANIZATIONS_REQUESTED,
    payload: {
      ids
    }
  };
}

export function listOrganizationsSucceeded(
  organizations: EnhetsregisteretOrganization[]
) {
  return {
    type: LIST_ORGANIZATIONS_SUCCEEDED,
    payload: {
      organizations
    }
  };
}

export function listOrganizationsFailed(errors: Error | Error[]) {
  return {
    type: LIST_ORGANIZATIONS_FAILED,
    payload: Array.isArray(errors) ? errors : [errors],
    error: true
  };
}

export function searchOrganizationsRequested(query?: string, size?: number) {
  return {
    type: SEARCH_ORGANIZATIONS_REQUESTED,
    payload: {
      query,
      size
    }
  };
}

export function searchOrganizationsSucceeded(
  organizations: EnhetsregisteretOrganization[]
) {
  return {
    type: SEARCH_ORGANIZATIONS_SUCCEEDED,
    payload: {
      organizations
    }
  };
}

export function searchOrganizationsFailed(errors: Error | Error[]) {
  return {
    type: SEARCH_ORGANIZATIONS_FAILED,
    payload: Array.isArray(errors) ? errors : [errors],
    error: true
  };
}
