import { CATALOG_SUCCESS } from '../../entrypoints/main/redux/modules/catalog';
import { saveCatalog } from '../../services/api/registration-api/datasets';

const catalogSaveThunk = ({ catalog }) => async dispatch => {
  const savedCatalog = await saveCatalog(catalog);
  if (savedCatalog) {
    dispatch({
      type: CATALOG_SUCCESS,
      meta: { catalogId: savedCatalog.id },
      payload: savedCatalog
    });
  }
};

export const asyncValidateCatalog = (values, dispatch) =>
  dispatch(catalogSaveThunk({ catalog: values })).catch(() => {}); // handle rejects because form validation api expects certain format of rejects
