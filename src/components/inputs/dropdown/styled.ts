import { Colour, theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';
import { DropDownProps } from '.';
import ChevronDownStroke from '../../../utils/assets/chevron-down-stroke.svg';

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

const iconStyle = css`
  // remove default select styles
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  // styling chevron-down-stroke
  background-image: url(${ChevronDownStroke});
  background-repeat: no-repeat;
  background-position-x: 80%;
  background-position-y: 50%;
  background-size: ${theme.fontSize('FS16')};
`;

const DropDown = styled.select<DropDownProps>`
  ${container};
  ${textStyle};
  ${iconStyle};

  color: ${({ dropdownColor }) => dropdownColor};
  background-color: ${({ bg }) => bg};
  min-width: 14rem;
  height: ${theme.spacing('S56')};
  border-radius: ${theme.spacing('S4')};
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};

  :hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

export { DropDown };
