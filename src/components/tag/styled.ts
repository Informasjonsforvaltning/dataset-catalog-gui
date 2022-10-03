import styled from 'styled-components';

const Tag = styled.span`
  height: 26px;
  padding: 3px 8px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  width: fit-content;

  svg {
    width: 13px;
    height: 13px;
  }
`;

const TagText = styled.label`
  height: 16px;
  font-family: 'Heebo', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  margin-left: 4px;
`;

export default { Tag, TagText };
