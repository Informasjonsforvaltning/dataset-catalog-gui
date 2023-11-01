import React from 'react';
import HeaderBase from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import env from '../../utils/constants/env';
import { authService } from '../../utils/authentication/auth-service';
import { withAuth } from '../../utils/authentication/auth-provider';
import { localization } from '../../utils/language/localization';
import { useGlobalContext } from '../../context/global-context';
import { useLocation } from 'react-router-dom';

const { FDK_BASE_URI, ADMIN_GUI_BASE_URI, FDK_COMMUNITY_BASE_URI, FDK_REGISTRATION_BASE_URI, CATALOG_ADMIN_BASE_URI } =
  env;

const Header = () => {
  const globalContext = useGlobalContext();
  const themeProfile = globalContext.theme;

  const showManageConceptCatalogsUrl = () => {
    const resourceRoles = authService.getResourceRoles();
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const currentCatalogId = pathParts[2];

    for (const role of resourceRoles) {
      const roleCatalogId = role?.resourceId;
      if (authService.hasOrganizationAdminPermission(currentCatalogId || roleCatalogId)) {
        return true; // Found a matching role with admin permission
      }
    }
    return false; // No matching role with admin permission
  };

  return (
    <HeaderBase
      themeProfile={themeProfile}
      username={authService && authService.getUser().name}
      onLogout={() => authService.logout()}
      useDemoLogo={env.USE_DEMO_LOGO}
      homeUrl={FDK_REGISTRATION_BASE_URI}
      skeHomeText='Datakataloger'
      showManageConceptCatalogsUrl={showManageConceptCatalogsUrl()}
      manageConceptCatalogsUrl={CATALOG_ADMIN_BASE_URI}
    >
      <Link aria-label={localization.registerData[1]} href={`${FDK_BASE_URI}/guidance`}>
        {localization.registerData[0]}
      </Link>
      <Link aria-label={localization.harvestData[1]} href={ADMIN_GUI_BASE_URI}>
        {localization.harvestData[0]}
      </Link>
      <Link aria-label={localization.dataVillage[1]} href={FDK_COMMUNITY_BASE_URI} external>
        {localization.dataVillage[0]}
      </Link>
      <Link aria-label={localization.searchInCatalogs[1]} href={FDK_BASE_URI} external>
        {localization.searchInCatalogs[0]}
      </Link>
    </HeaderBase>
  );
};

export default withAuth(Header);
