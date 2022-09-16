import React, { memo, FC } from 'react';
import { compose } from 'redux';
import HeaderBase from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import env from '../../utils/constants/env';
import { authService } from '../../utils/authentication/auth-service';
import { withAuth } from '../../utils/authentication/auth-provider';
import { getThemeProfile } from '../../utils/helpers/theme-checker';

const { FDK_BASE_URI, ADMIN_GUI_BASE_URI, FDK_COMMUNITY_BASE_URI } = env;

const Header: FC = () => {
  let signOut = undefined;
  let themeProfile;

  if (authService) {
    signOut = () => authService.logout();
    themeProfile = getThemeProfile();
  }

  return (
    <HeaderBase
      themeProfile={themeProfile}
      username={authService && authService.getUser().name ? authService.getUser().name : 'Default Name'}
      onLogout={signOut}
      useDemoLogo={env.USE_DEMO_LOGO}
      skeHomeText={''}
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

const enhanced = withAuth === null ? compose<FC>(memo, withAuth)(Header) : memo(Header);

export default enhanced;
