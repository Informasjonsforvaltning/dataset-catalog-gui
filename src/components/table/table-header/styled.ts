import { theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const TableHead = styled.thead``;

const TableHeadRow = styled.tr`
  display: flex;
  flex-direction: row;
  height: ${theme.spacing('S48')};
  padding: 0 ${theme.spacing('S10')};
`;

export default { TableHead, TableHeadRow };
