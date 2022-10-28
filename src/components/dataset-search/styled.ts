import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import Breakpoint from '../../utils/styles/break-point';
import InputBox from '../inputs/input-box';

const Search = styled.span`
  width: 100%;
  display: flex;
  align-items: center;

  button:nth-child(2) {
    margin-right: ${theme.spacing('S10')};
  }

  ${Breakpoint.MEDIUM} {
    flex-direction: column;
    button:nth-child(2) {
      margin-right: 0;
    }
    button {
      margin-top: ${theme.spacing('S10')};
      width: 100%;
    }
  }
`;

const StyledInputBox = styled(InputBox)`
  width: 100%;
  margin-right: ${theme.spacing('S10')};
  border-radius: ${theme.spacing('S4')};
  border: 0.1rem solid ${theme.colour(Colour.NEUTRAL, 'N60')};

  ${Breakpoint.MEDIUM} {
    margin: 0;
  }
`;

export default { Search, StyledInputBox };
