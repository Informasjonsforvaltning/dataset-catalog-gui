import React, { memo } from 'react';
import HeaderBase from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import env from '../../utils/constants/env';
import { authService } from '../../utils/authentication/auth-service';
import { withAuth } from '../../utils/authentication/auth-provider';
import { getThemeProfile } from '../../utils/helpers/theme-checker';

const { FDK_BASE_URI, ADMIN_GUI_BASE_URI, FDK_COMMUNITY_BASE_URI } = env;

const Header = () => {
  const themeProfile = getThemeProfile();

  return (
    <HeaderBase
      themeProfile={themeProfile}
      username={authService && authService.getUser().name}
      onLogout={() => authService.logout()}
      useDemoLogo={env.USE_DEMO_LOGO}
      skeHomeText={themeProfile === 'ske' ? 'Datakataloger' : ''}
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

export default memo(withAuth(Header));
