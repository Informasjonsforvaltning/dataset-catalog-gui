import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const App = styled.body`
  background-color: ${theme.colour(Colour.GREEN, 'G15')};
`;

export default { App };
