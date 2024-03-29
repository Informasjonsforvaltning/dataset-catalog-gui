import React, { ComponentType, createContext, PureComponent } from 'react';

import { authService } from './auth-service';
import { Auth } from '.';

const AuthContext = createContext<any>(null);

interface Props {
  children: any;
}

interface State {
  service: Auth;
  instantiated: boolean;
}

class AuthProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      service: authService,
      instantiated: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    const { service } = this.state;
    await service.init({ loginRequired: true });
    this.setState({ instantiated: true });
  }

  public render(): JSX.Element {
    const { children } = this.props;
    const { instantiated } = this.state;
    return instantiated ? <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider> : <></>;
  }
}

export function withAuth(Child: ComponentType<any>): ComponentType<any> {
  return (props: any) => (
    <AuthContext.Consumer>{({ service }) => <Child {...props} authService={service} />}</AuthContext.Consumer>
  );
}

export default AuthProvider;
