import { Link as RRDLink } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbsNav = styled.nav`
  color: #335380;
`;

const Link = styled(RRDLink)`
  && {
    text-decoration: underline;
    font-family: 'Heebo', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #335380;

    :hover {
      text-decoration: none;
    }
  }
`;

export default { BreadcrumbsNav, Link };
