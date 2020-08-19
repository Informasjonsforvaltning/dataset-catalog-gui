import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { EnhetsregisteretOrganization } from '../../types';

export interface Props {
  organizations: EnhetsregisteretOrganization[];
  organizationSuggestions: EnhetsregisteretOrganization[];
  enhetsregisteretActions: typeof actions;
}

const withEnhetsregisteret = (Component: ComponentType<any>) => {
  const WrappedComponent: FC<Props> = props => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    organizations: state.EnhetsregisteretReducer.get('organizations').toJS(),
    organizationSuggestions: state.EnhetsregisteretReducer.get(
      'organizationSuggestions'
    ).toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    enhetsregisteretActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withEnhetsregisteret;
