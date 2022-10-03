import { Link as RRDLink } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbsNav = styled.nav`
  color: #335380;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 16px 16px 0 16px;
  overflow-wrap: break-word;
`;

const Link = styled(RRDLink)`
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
`;

const CrumbDivider = styled.span`
  height: 9px;
  width: 5px;
  margin: 0 10px 0 10px;
  font-family: 'Heebo', sans-serif;
`;

export default { BreadcrumbsNav, Link, CrumbDivider };
