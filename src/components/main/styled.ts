import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Root = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: ${theme.spacing('S16')};
  overflow-wrap: break-word;
`;

export default { Root };
