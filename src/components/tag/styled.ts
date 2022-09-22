import styled from 'styled-components';

const Tag = styled.span`
  && {
    height: 26px;
    padding: 3px 8px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    width: fit-content;
    color: ${props => (props.style?.backgroundColor !== '#335380' ? '#335380' : '#fff')};

    svg {
      color: ${props => (props.style?.backgroundColor !== '#335380' ? '#335380' : 'fff')};
    }
  }
`;

const TagText = styled.label`
  && {
    height: 16px;
    font-family: 'Heebo', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
  }
`;

const TagIcon = styled.svg`
  && {
    width: 16px;
    height: 16px;
    padding-right: 4px;
  }
`;

export default { Tag, TagText, TagIcon };
