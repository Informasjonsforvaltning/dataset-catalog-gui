import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const Cell = styled.th`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${theme.spacing('S4')};
`;

const Title = styled.p`
  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S24')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

const Icon = styled.svg`
  width: ${theme.spacing('S24')};
  height: ${theme.spacing('S24')};
  padding-left: ${theme.spacing('S4')};
`;

export default { Cell, Title, Icon };
