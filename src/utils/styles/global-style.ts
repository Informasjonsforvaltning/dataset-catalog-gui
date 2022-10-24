import { theme } from '@fellesdatakatalog/theme';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: ${theme.fontFamily()};
  }
`;

export default GlobalStyle;
