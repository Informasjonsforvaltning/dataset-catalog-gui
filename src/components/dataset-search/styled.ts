import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

import Breakpoint from '../../utils/styles/break-point';

const Search = styled.span`
  width: 100%;
  display: flex;
  gap: ${theme.spacing('S10')};
  align-items: center;

  div:first-child {
    flex-grow: 1;
  }

  ${Breakpoint.MEDIUM} {
    flex-direction: column;
    button {
      margin-top: ${theme.spacing('S10')};
      width: 100%;
    }
    div:first-child {
      width: 100%;
    }
  }
`;

export default { Search };
