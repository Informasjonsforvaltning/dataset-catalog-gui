import { Colour, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const TextField = styled.div`
  height: ${theme.spacing('S56')};
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const InputPlaceHolder = styled.p`
  margin-left: ${theme.spacing('S16')};
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS20')};

  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  padding-right: ${theme.spacing('S4')};
  line-height: ${theme.spacing('S24')};
  border-radius: ${theme.spacing('S48')};
  color: ${theme.colour(Colour.NEUTRAL, 'N50')};
`;

const Input = styled.input`
  position: absolute;
  margin: 0 ${theme.spacing('S16')} 0 ${theme.spacing('S16')};
  width: 684px;
  font-size: ${theme.fontSize('FS20')};

  background: none;
  border: 0;
  :focus {
    outline: none;
    border: 0;
  }
`;

export default { TextField, InputPlaceHolder, Input };
