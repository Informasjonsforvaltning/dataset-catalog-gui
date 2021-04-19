import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';

import BannerBase from '../../../../../../components/banner';

const Breadcrumbs = styled.nav`
  margin-top: -${theme.spacing('S16')};
  padding: ${theme.spacing('S10')} 0;
  border-bottom: 1px solid ${theme.colour(Colour.NEUTRAL, 'N30')};
`;

const Page = styled.section`
  margin-top: ${theme.spacing('S32')};
`;

const Banner = styled(BannerBase)`
  margin-bottom: 15px;

  & a {
    display: inline-flex;
    color: ${theme.colour(Colour.YELLOW, 'Y70')} !important;
  }
`;

const CatalogTitle = styled.h2`
  font-size: ${theme.fontSize('FS24')};
  font-weight: ${theme.fontWeight('FW500')};
`;

const TermsLink = styled(LinkBase)`
  margin-top: ${theme.spacing('S10')};
`;

export default { Breadcrumbs, Page, Banner, CatalogTitle, TermsLink };
