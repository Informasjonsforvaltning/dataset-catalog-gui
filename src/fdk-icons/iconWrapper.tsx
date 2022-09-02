import styled from 'styled-components';

const IconWrapper = styled.div`
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

const LightIconWrapper = styled(IconWrapper)`
  & > svg {
    & * {
      stroke: #fff;
  }
`;

const InlineIconWrapper = styled(IconWrapper)`
  display: inline-block;
`;

const LightInlineIconWrapper = styled(InlineIconWrapper)`
  & > svg {
    & * {
      stroke: #fff;
    }
  }
`;

export default {
  IconWrapper,
  LightIconWrapper,
  InlineIconWrapper,
  LightInlineIconWrapper
};
