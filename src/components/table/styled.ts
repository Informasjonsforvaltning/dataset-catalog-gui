import { Colour, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  background-color: ${theme.colour(Colour.CYAN, 'C20')};
  margin-top: ${theme.spacing('S40')};
`;

export default { Table };
