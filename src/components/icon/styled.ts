import styled from 'styled-components';
import SvgIcon from '@fellesdatakatalog/icons';
import { theme } from '@fellesdatakatalog/theme';

const Icon = styled(SvgIcon)`
  width: ${theme.spacing('S24')};
  height: ${theme.spacing('S24')};
`;

export default { Icon };
