import React, { memo, FC } from 'react';
import { compose } from 'redux';
import FooterBase from '@fellesdatakatalog/internal-footer';

import { getThemeProfile } from '../../utils/helpers/theme-checker';

const Footer = () => {
  const themeProfile = getThemeProfile();

  return <FooterBase themeProfile={themeProfile} />;
};

export default compose<FC>(memo)(Footer);
