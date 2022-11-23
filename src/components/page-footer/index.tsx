import React from 'react';
import FooterBase from '@fellesdatakatalog/internal-footer';

import { useGlobalContext } from '../../context/global-context';

const Footer = () => {
  const globalContext = useGlobalContext();
  const themeProfile = globalContext.theme;
  return <FooterBase themeProfile={themeProfile} />;
};

export default Footer;
