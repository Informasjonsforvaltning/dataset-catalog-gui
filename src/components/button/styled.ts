import { Colour, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Button = styled.button`
  height: 100%;

  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S16')};
  background: none;
  border: none;
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const StartIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-right: ${theme.spacing('S8')};
`;

const EndIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-left: ${theme.spacing('S8')};
`;

const ButtonContainer = styled.span`
  height: ${theme.spacing('S56')};
  border-radius: ${theme.spacing('S4')};
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colour(Colour.BLUE, 'B60')};

  :hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    > button {
      color: ${theme.colour(Colour.NEUTRAL, 'N0')};
      background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    }
    & * {
      stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
  }
`;

export default { Button, ButtonContainer, StartIcon, EndIcon };
