import {
  GET_REFERENCE_DATA_REQUESTED,
  GET_NEW_REFERENCE_DATA_REQUESTED,
  GET_REFERENCE_DATA_SUCCEEDED,
  GET_REFERENCE_DATA_FAILED
} from './action-types';

import type { ReferenceData } from '../../../types';
import { ReferenceDataCode } from '../../../types/enums';

export function getReferenceDataRequested(codes: ReferenceDataCode[]) {
  return {
    type: GET_REFERENCE_DATA_REQUESTED,
    payload: {
      codes
    }
  };
}

export function getNewReferenceDataRequested(codes: ReferenceDataCode[]) {
  return {
    type: GET_NEW_REFERENCE_DATA_REQUESTED,
    payload: {
      codes
    }
  };
}

export function getReferenceDataSucceeded(data: ReferenceData) {
  return {
    type: GET_REFERENCE_DATA_SUCCEEDED,
    payload: {
      data
    }
  };
}

export function getReferenceDataFailed(message: string) {
  return {
    type: GET_REFERENCE_DATA_FAILED,
    payload: {
      message
    }
  };
}
