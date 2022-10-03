import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: ${theme.spacing('S16')};
  overflow-wrap: break-word;
`;

const Divider = styled.hr`
  margin-top: 15px;
  border: #d5e1f2 1px solid;
  width: 100%;
`;

export default { Divider, Main };
