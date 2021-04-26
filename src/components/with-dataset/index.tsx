import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Dataset } from '../../types';

export interface Props {
  dataset?: Dataset;
  createdDataset?: Dataset;
  datasetActions: typeof actions;
  isLoadingDataset: boolean;
  isCreatingDataset: boolean;
  isDeletingDataset: boolean;
}

const withDataset = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    dataset: state.DatasetReducer.get('dataset')?.toJS(),
    createdDataset: state.DatasetReducer.get('createdDataset')?.toJS(),
    isLoadingDataset: state.DatasetReducer.get('isLoadingDataset'),
    isCreatingDataset: state.DatasetReducer.get('isCreatingDataset'),
    isDeletingDataset: state.DatasetReducer.get('isDeletingDataset')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withDataset;
