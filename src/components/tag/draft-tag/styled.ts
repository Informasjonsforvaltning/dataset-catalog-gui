import styled from 'styled-components';
import Tag from '..';

const DraftTag = styled(Tag)`
  color: #335380;
  background-color: #f0f3f7;

  & * {
    stroke: #335380;
  }
`;

export default { DraftTag };
