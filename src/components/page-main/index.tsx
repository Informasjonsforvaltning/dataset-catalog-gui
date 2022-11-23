import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Breadcrumbs from '../breadcrumbs';
import Footer from '../page-footer';
import Header from '../page-header';
import SC from './styled';

const Main: FC = () => (
  <>
    <Header />
    <SC.Main>
      <Breadcrumbs />
      <SC.Divider />
      <SC.OutletWrapper>
        <Outlet />
      </SC.OutletWrapper>
    </SC.Main>
    <Footer />
  </>
);

export default Main;
