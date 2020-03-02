import React, { FC } from 'react';

import { AppHeader } from '../../components/app-header/app-header.component';
import { Footer } from '../../components/app-footer/app-footer.component';

import SC from './styled';

const MaintenancePage: FC = () => (
  <SC.MaintenancePage className="site theme-fdk">
    <AppHeader />
    <SC.PageContent className="container">
      <SC.Heading>Vi oppgraderer siden</SC.Heading>
      <SC.Subheading>
        ...men er snart tilbake! Prøv igjen litt senere.
      </SC.Subheading>
    </SC.PageContent>
    <Footer />
  </SC.MaintenancePage>
);

export default MaintenancePage;
