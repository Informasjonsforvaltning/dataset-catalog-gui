import { Colour, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const TableRow = styled.tr`
  display: flex;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  border-radius: ${theme.spacing('S4')};
  margin-top: ${theme.spacing('S4')};
  align-items: center;
  padding: ${theme.spacing('S12')} ${theme.spacing('S10')};

  :hover {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    p {
      color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }

    label {
      color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    }

    span {
      background-color: ${theme.colour(Colour.NEUTRAL, 'N0')} !important;
    }

    & * {
      stroke: ${theme.colour(Colour.NEUTRAL, 'N70')};
    }
  }
`;

export default { TableRow };
