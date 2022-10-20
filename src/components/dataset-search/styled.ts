import styled from 'styled-components';
import Breakpoint from '../../utils/styles/break-point';

import Button from '../button';
import InputBox from '../input-box';

const Search = styled.span`
  width: 100%;
  display: flex;
  align-items: center;

  span:nth-child(2) {
    margin-right: 10px;
  }

  ${Breakpoint.MEDIUM} {
    flex-direction: column;
    span:nth-child(2) {
      margin-right: 0;
    }
  }
`;

const SearchButton = styled(Button)`
  background-color: #d5e1f2;
  color: #335380;
  min-width: 220px;
  margin-left: 10px;

  & button {
    color: #335380;
  }

  & * {
    stroke: #335380;
  }

  ${Breakpoint.MEDIUM} {
    margin: 10px 0 0 0;
    width: 100%;
  }
`;

const StyledInputBox = styled(InputBox)`
  width: 100%;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #2d3741;

  ${Breakpoint.MEDIUM} {
    margin: 0;
  }
`;

export default { Search, SearchButton, StyledInputBox };
