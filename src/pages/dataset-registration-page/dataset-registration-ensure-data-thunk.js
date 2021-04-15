import { batch } from 'react-redux';

import {
  fetchReferenceDataIfNeededAction,
  REFERENCEDATA_PATH_FREQUENCY,
  REFERENCEDATA_PATH_LOS,
  REFERENCEDATA_PATH_OPENLICENCES,
  REFERENCEDATA_PATH_PROVENANCE,
  REFERENCEDATA_PATH_REFERENCETYPES,
  REFERENCEDATA_PATH_MEDIATYPES,
  REFERENCEDATA_PATH_THEMES
} from '../../entrypoints/main/redux/modules/referenceData';

export const datasetRegistrationEnsureDataThunk = () => dispatch => {
  batch(() => {
    dispatch(fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_PROVENANCE));
    dispatch(fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_FREQUENCY));
    dispatch(fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_THEMES));
    dispatch(
      fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_REFERENCETYPES)
    );
    dispatch(fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_OPENLICENCES));
    dispatch(fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_MEDIATYPES));
    dispatch(fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_LOS));
  });
};
