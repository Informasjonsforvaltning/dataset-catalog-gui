import styled, { css } from 'styled-components';

import { Variant } from './enums';

const Banner = styled.div<{ variant: Variant }>`
  display: flex;
  align-items: flex-start;
  padding: 15px 20px;
  border: 2px solid transparent;
  border-radius: 5px;
  line-height: 24px;

  & > svg {
    margin-right: 10px;
    min-height: 24px;
    min-width: 24px;
  }

  ${({ variant }) => {
    switch (variant) {
      case Variant.INFO:
        return css``;
      case Variant.SUCCESS:
        return css`
          background: #d9ebe8;
          border-color: #007d69;
          color: #007d69;

          & > svg {
            color: #007d69;
            fill: #007d69;
          }
        `;
      case Variant.WARNING:
        return css`
          background: #fff2d8;
          border-color: #8f640e;
          color: #8f640e;

          & > svg {
            color: #8f640e;
            fill: #8f640e;
          }
        `;
      case Variant.ERROR:
        return css``;
      case Variant.NORMAL:
      default:
        return css``;
    }
  }}
`;

const Body = styled.div`
  & * {
    display: inline;
  }

  & a {
    text-decoration: underline;
  }
`;

export default { Banner, Body };
