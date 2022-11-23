import styled from 'styled-components';
import SvgIcon from '@fellesdatakatalog/icons';
import { theme } from '@fellesdatakatalog/theme';

const Icon = styled(SvgIcon)`
  width: ${theme.spacing('S24')};
  height: ${theme.spacing('S24')};
`;

const Text = styled.text`
  stroke: black;
  dominant-baseline: middle;
`;

export { Icon, Text };
