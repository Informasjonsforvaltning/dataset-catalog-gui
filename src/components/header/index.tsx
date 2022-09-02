import React, { memo, FC } from 'react';
import { compose } from 'redux';
import HeaderBase from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';
import { ThemeProfile } from '@fellesdatakatalog/theme';

import env from '../../env';

import { withAuth } from '../../providers/auth';
import { authService } from '../../services/auth/auth-service';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

const {
  FDK_BASE_URI,
  ADMIN_GUI_BASE_URI,
  SKE_THEME_PROFILE,
  FDK_COMMUNITY_BASE_URI
} = env;

interface Props extends TranslationsProps {}

const Header: FC<Props> = ({ translationsService }) => {
  const signOut = () => authService.logout();

  const isSkatteetatenThemeProfile =
    authService
      .getResourceRoles()
      .some(({ resourceId }) =>
        SKE_THEME_PROFILE?.split(',').includes(resourceId)
      ) || !!localStorage.getItem('skeProfile');

  const themeProfile = isSkatteetatenThemeProfile
    ? ThemeProfile.SKE
    : ThemeProfile.FDK;

  return (
    <HeaderBase
      themeProfile={themeProfile}
      username={authService.getUser()?.name}
      onLogout={signOut}
      useDemoLogo={env.USE_DEMO_LOGO}
      skeHomeText={
        isSkatteetatenThemeProfile
          ? translationsService.translate('dataCatalogs')
          : ''
      }
    >
      <Link href={`${FDK_BASE_URI}/guidance`}>Registrere data</Link>
      <Link href={ADMIN_GUI_BASE_URI}>Høste data</Link>
      <Link href={FDK_COMMUNITY_BASE_URI} external>
        Datalandsbyen
      </Link>
      <Link href={FDK_BASE_URI} external>
        Søk i Felles datakatalog
      </Link>
    </HeaderBase>
  );
};

export default compose<FC>(memo, withAuth, withTranslations)(Header);
