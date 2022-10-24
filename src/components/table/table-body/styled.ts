import { theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing('S40')};
`;

export default { TableBody };
