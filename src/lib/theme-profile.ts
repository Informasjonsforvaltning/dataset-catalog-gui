import { ResourceRole } from './auth/auth';

export const isSkeThemeProfile = (
  skeThemeProfile: string,
  resourceRoles: ResourceRole[] = []
): boolean =>
  resourceRoles.some(({ resourceId }: ResourceRole) =>
    skeThemeProfile?.split(',').includes(resourceId)
  ) || !!localStorage.getItem('skeProfile');
