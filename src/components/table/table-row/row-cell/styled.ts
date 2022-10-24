import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const RowCell = styled.td`
  padding-left: ${theme.spacing('S4')};
`;

const CellText = styled.p`
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S24')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

export default { RowCell, CellText };
