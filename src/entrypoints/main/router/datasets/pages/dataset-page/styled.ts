import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Breadcrumbs = styled.nav`
  margin-top: -${theme.spacing('S16')};
  padding: ${theme.spacing('S10')} 0;
  border-bottom: 1px solid ${theme.colour(Colour.NEUTRAL, 'N30')};
`;

const Page = styled.section`
  margin-top: ${theme.spacing('S24')};
`;

export default { Page, Breadcrumbs };
