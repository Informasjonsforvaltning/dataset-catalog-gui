import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '@fellesdatakatalog/internal-footer';
import Header from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import { ThemeProfile } from '@fellesdatakatalog/theme';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs.component';
import { Routes } from './routes';
import { getConfig } from '../config';
import { isSkeThemeProfile } from '../lib/theme-profile';
import { authService } from '../services/auth/auth-service';
import localization from '../services/localization';

const App: FC = () => {
  const themeProfile = isSkeThemeProfile(
    getConfig().skeThemeProfile,
    authService.getResourceRoles()
  )
    ? ThemeProfile.SKE
    : ThemeProfile.FDK;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site theme-fdk">
        <Header
          themeProfile={themeProfile}
          username={authService.getUser()?.name}
          onLogout={authService.logout}
          {...(themeProfile === ThemeProfile.SKE
            ? { skeHomeText: localization.dataCatalogs }
            : {})}
        >
          <Link href={`${getConfig().searchHost}/guidance`}>
            Registrere data
          </Link>
          <Link href={getConfig().adminGuiHost}>Høste data</Link>
          <Link href={getConfig().searchHost} external>
            Søk i Felles datakatalog
          </Link>
        </Header>
        <Breadcrumbs />
        <div className="site-content d-flex flex-column pt-5">
          <Routes />
        </div>
        <Footer themeProfile={themeProfile} />
      </div>
    </BrowserRouter>
  );
};

export default App;
