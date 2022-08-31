import { ThemeProfile } from '@fellesdatakatalog/theme';
import { authService } from '../../authentication/auth-service';
import env from '../../utils/constants/env';
const { SKE_THEME_PROFILE } = env;

export const getThemeProfile = () =>
  authService.getResourceRoles().some(({ resourceId }) => SKE_THEME_PROFILE?.split(',').includes(resourceId)) ||
  !!localStorage.getItem('skeProfile')
    ? ThemeProfile.SKE
    : ThemeProfile.FDK;
