import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Publisher } from '../../types';

export interface Props {
  organization?: Publisher;
  isLoadingOrganization: boolean;
  isLoadingEnhetsregisteretOrganization: boolean;
  organizationActions: typeof actions;
}

const withOrganization = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    organization: state.OrganizationReducer.get('organization')?.toJS(),
    isLoadingOrganization: state.OrganizationReducer.get(
      'isLoadingOrganization'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    organizationActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withOrganization;
