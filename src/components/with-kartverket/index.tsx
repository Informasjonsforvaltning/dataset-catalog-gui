import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { KartverketPlace } from '../../types';

export interface Props {
  places: KartverketPlace[];
  placeSuggestions: KartverketPlace[];
  isLoadingPlaces: boolean;
  isLoadingPlaceSuggestions: boolean;
  kartverketActions: typeof actions;
}

const withKartverket = (Component: ComponentType<any>) => {
  const WrappedComponent: FC<Props> = props => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    places: state.KartverketReducer.get('places').toJS(),
    placeSuggestions: state.KartverketReducer.get('placeSuggestions').toJS(),
    isLoadingPlaces: state.KartverketReducer.get('isLoadingPlaces'),
    isLoadingPlaceSuggestions: state.KartverketReducer.get(
      'isLoadingPlaceSuggestions'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    kartverketActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withKartverket;
