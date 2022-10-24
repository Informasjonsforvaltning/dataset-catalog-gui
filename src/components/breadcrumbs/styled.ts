import { Link as RRDLink } from 'react-router-dom';
import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const BreadcrumbsNav = styled.nav`
  color: ${theme.colour(Colour.BLUE, 'B60')};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: ${theme.spacing('S16')} ${theme.spacing('S16')} 0 ${theme.spacing('S16')};
  overflow-wrap: break-word;
`;

const Link = styled(RRDLink)`
  text-decoration: underline;
  font-style: normal;
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S24')};
  color: ${theme.colour(Colour.BLUE, 'B60')};

  :hover {
    text-decoration: none;
  }
`;

const CrumbDivider = styled.span`
  height: ${theme.spacing('S8')};
  width: ${theme.spacing('S4')};
  margin: 0 ${theme.spacing('S10')} 0 ${theme.spacing('S10')};
`;

export default { BreadcrumbsNav, Link, CrumbDivider };
