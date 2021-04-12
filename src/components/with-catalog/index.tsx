import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Catalog } from '../../types';

export interface Props {
  datasetCatalog?: Catalog;
  catalogActions: typeof actions;
  isLoadingDatasetCatalog: boolean;
}

const withCatalog = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasetCatalog: state.CatalogReducer.get('datasetCatalog')?.toJS(),
    isLoadingDatasetCatalog: state.CatalogReducer.get('isLoadingDatasetCatalog')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    catalogActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withCatalog;
