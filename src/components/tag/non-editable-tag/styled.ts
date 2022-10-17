import styled from 'styled-components';
import Tag from '..';

const NonEditableTag = styled(Tag)`
  background-color: #f0f3f7;
  color: #335380;

  & * {
    stroke: #335380;
  }
`;

export default { NonEditableTag };