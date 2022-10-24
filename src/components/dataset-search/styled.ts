import styled from 'styled-components';
import Breakpoint from '../../utils/styles/break-point';
import { Colour, theme } from '@fellesdatakatalog/theme';

import Button from '../button';
import InputBox from '../input-box';

const Search = styled.span`
  width: 100%;
  display: flex;
  align-items: center;

  span:nth-child(2) {
    margin-right: ${theme.spacing('S10')};
  }

  ${Breakpoint.MEDIUM} {
    flex-direction: column;
    span:nth-child(2) {
      margin-right: 0;
    }
  }
`;

const SearchButton = styled(Button)`
  background-color: ${theme.colour(Colour.BLUE, 'B30')};
  color: ${theme.colour(Colour.BLUE, 'B60')};
  min-width: 220px;
  margin-left: ${theme.spacing('S10')};

  & button {
    color: ${theme.colour(Colour.BLUE, 'B60')};
  }

  & * {
    stroke: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }

  ${Breakpoint.MEDIUM} {
    margin: ${theme.spacing('S10')} 0 0 0;
    width: 100%;
  }
`;

const StyledInputBox = styled(InputBox)`
  width: 100%;
  margin-right: ${theme.spacing('S10')};
  border-radius: ${theme.spacing('S4')};
  border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N60')};

  ${Breakpoint.MEDIUM} {
    margin: 0;
  }
`;

export default { Search, SearchButton, StyledInputBox };
