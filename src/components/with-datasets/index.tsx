import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Dataset } from '../../types';

export interface Props {
  datasets: Dataset[];
  datasetSuggestions: Dataset[];
  datasetsActions: typeof actions;
  isLoadingDatasets: boolean;
  isLoadingDatasetSuggestions: boolean;
}

const withDatasets = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasets: state.DatasetsReducer.get('datasets')?.toJS() ?? [],
    datasetSuggestions:
      state.DatasetsReducer.get('datasetSuggestions')?.toJS() ?? [],
    isLoadingDatasets: state.DatasetsReducer.get('isLoadingDatasets'),
    isLoadingDatasetSuggestions: state.DatasetsReducer.get(
      'isLoadingDatasetSuggestions'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withDatasets;
