import { theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';
import { CellType } from '.';

const Cell = styled.th<CellType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${theme.spacing('S4')};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;

const TableHeadRow = styled.tr`
  display: flex;
  flex-direction: row;
  height: ${theme.spacing('S48')};
  padding: 0 ${theme.spacing('S10')};
`;

export default { TableHeadRow, Cell };
