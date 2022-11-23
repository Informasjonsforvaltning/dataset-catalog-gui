import { Colour, theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';
import { InputFieldProps } from '.';

const InputField = styled.div<InputFieldProps>`
  height: ${theme.spacing('S56')};
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 0.1rem solid ${theme.colour(Colour.NEUTRAL, 'N70')};
  border-radius: ${theme.spacing('S4')};

  :hover {
    border: 0.15rem solid ${theme.colour(Colour.NEUTRAL, 'N70')};
    margin: -0.05rem;
  }

  svg {
    width: ${theme.spacing('S32')};
    height: ${theme.spacing('S32')};

    ${({ iconPos }) =>
      iconPos && iconPos === 'right'
        ? css`
            margin-right: ${theme.spacing('S12')};
          `
        : css`
            margin-left: ${theme.spacing('S12')};
          `}
  }

  ${({ error }) =>
    error &&
    css`
      input {
        color: ${theme.colour(Colour.RED, 'R60')};
      }
      input::placeholder {
        color: ${theme.colour(Colour.RED, 'R60')};
      }
      border-color: ${theme.colour(Colour.RED, 'R60')};
      background-color: ${theme.colour(Colour.RED, 'R15')};
      :hover {
        border-color: ${theme.colour(Colour.RED, 'R60')};
      }
    `}
`;

const Input = styled.input`
  margin: 0 ${theme.spacing('S16')} 0 ${theme.spacing('S16')};
  width: 100%;
  font-size: ${theme.fontSize('FS20')};
  background: none;
  border: 0;

  :focus-visible {
    outline: none;
    border: 0;
  }
`;

/* const TextArea = styled.textarea`
  
` */

/* const getStyledComponent = (type: InputType): AnyStyledComponent => {
  switch (type) {
    default:
      return Input;
  }
}; */

export { Input, InputField };
