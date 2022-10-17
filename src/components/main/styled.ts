import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const OutletWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const Main = styled.main`
  flex: 1 0 auto;
`;

export default { Divider, Main, OutletWrapper };
