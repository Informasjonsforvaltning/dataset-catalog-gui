import { Colour, theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';

interface Props {
  $dropdownColor?: (prop: any) => string;
  $bg?: (prop: any) => string;
  $icon?: string;
  $hoverIcon?: string;
}

const container = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

const textStyle = css`
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S16')};
  white-space: nowrap;
`;

const DropDown = styled.select<Props>`
  ${container};
  ${textStyle};
  
  // remove default select styles
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  // styling chevron-down-stroke
  ${({ $icon }) => css`
    background-image: url(${$icon});
  `}
  
  background-repeat: no-repeat;
  background-position-x: 80%;
  background-position-y: 50%;
  background-size: ${theme.fontSize('FS16')};

  color: ${({ $dropdownColor }) => $dropdownColor};
  background-color: ${({ $bg }) => $bg};
  min-width: 14rem;
  height: ${theme.spacing('S56')};
  border-radius: ${theme.spacing('S4')};
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};

  :hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    ${({ $hoverIcon }) => css`
      background-image: url(${$hoverIcon});
    `}
  }
`;

export { DropDown };
