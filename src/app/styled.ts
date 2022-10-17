import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const App = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colour(Colour.GREEN, 'G15')};
  overflow-x: hidden;
  height: 100vh;
`;

export default { App };
