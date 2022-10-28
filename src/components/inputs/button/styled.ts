import { Colour, theme } from '@fellesdatakatalog/theme';
import styled, { AnyStyledComponent, css } from 'styled-components';
import { ButtonProps, ButtonType } from '.';

const button = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

const iconStyle = css`
  svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const linkStyle = css`
  ${button};
  ${iconStyle};

  padding: ${theme.spacing('S4')};
  border-bottom: dashed;
  height: ${theme.spacing('S24')};
  background: none;

  svg {
    width: ${theme.spacing('S16')};
    height: ${theme.spacing('S16')};
  }

  :hover {
    border-bottom: inherit;
  }
`;

const filledStyle = css`
  ${button};
  ${iconStyle};

  height: ${theme.spacing('S56')};
  border-radius: ${theme.spacing('S4')};
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  :hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};

    & * {
      stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
  }
`;

const tranparentStyle = css`
  ${button};
  ${iconStyle};

  background: none;
  border: none;
`;

const Text = styled.p`
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S16')};
  white-space: nowrap;
`;

const Filled = styled.button<ButtonProps>`
  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
  ${filledStyle};

  ${({ color }) =>
    color &&
    css`
      & * {
        stroke: ${color};
      }
    `}

  ${({ iconPos }) =>
    iconPos &&
    (iconPos === 'left'
      ? css`
          svg {
            margin-right: ${theme.spacing('S8')};
          }
        `
      : css`
          svg {
            margin-left: ${theme.spacing('S8')};
          }
        `)}
`;

const Link = styled.button<ButtonProps>`
  color: ${({ color }) => color};
  border-color: ${({ color }) => color};

  ${({ color }) =>
    color &&
    css`
      & * {
        stroke: ${color};
      }
    `}

  ${linkStyle};
  ${({ iconPos }) =>
    iconPos &&
    (iconPos === 'left'
      ? css`
          svg {
            margin-right: ${theme.spacing('S4')};
          }
        `
      : css`
          svg {
            margin-left: ${theme.spacing('S4')};
          }
        `)}
`;

const Transparent = styled.button<ButtonProps>`
  ${tranparentStyle};

  ${({ iconPos }) =>
    iconPos &&
    (iconPos === 'left'
      ? css`
          svg {
            margin-right: ${theme.spacing('S4')};
          }
        `
      : css`
          svg {
            margin-left: ${theme.spacing('S4')};
          }
        `)}
`;

const getStyledComponent = (type: ButtonType): AnyStyledComponent => {
  switch (type) {
    case 'filled':
      return Filled;
    case 'link':
      return Link;
    case 'transparent':
      return Transparent;
    default:
      return Filled;
  }
};

export { getStyledComponent, Text };
