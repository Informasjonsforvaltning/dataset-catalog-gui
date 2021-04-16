import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Catalog } from '../../types';

export interface Props {
  catalogs: Catalog[];
  catalogsActions: typeof actions;
  isLoadingCatalogs: boolean;
}

const withCatalogs = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    catalogs: state.CatalogsReducer.get('catalogs')?.toJS() ?? [],
    isLoadingCatalogs: state.CatalogsReducer.get('isLoadingCatalogs')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    catalogsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withCatalogs;
