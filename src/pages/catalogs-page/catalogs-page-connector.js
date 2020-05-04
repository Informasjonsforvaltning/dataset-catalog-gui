import { connect } from 'react-redux';
import { fetchCatalogsIfNeeded } from '../../redux/modules/catalogs';
import {
  fetchDatasetsIfNeeded,
  selectorForDatasetsState
} from '../../redux/modules/datasets';

const mapStateToProps = state => {
  const { catalogs, apis } = state;
  const { catalogItems, isFetching: isFetchingCatalogs } = catalogs || {};
  const datasetsState = selectorForDatasetsState(state);
  return {
    catalogItems,
    datasetsState,
    apis,
    isFetchingCatalogs
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCatalogsIfNeeded: () => dispatch(fetchCatalogsIfNeeded()),
  fetchDatasetsIfNeeded: catalogId => dispatch(fetchDatasetsIfNeeded(catalogId))
});

export const catalogsPageConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);
