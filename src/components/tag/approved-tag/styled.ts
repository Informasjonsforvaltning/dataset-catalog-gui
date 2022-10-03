import styled from 'styled-components';
import Tag from '..';

const ApprovedTag = styled(Tag)`
  color: #335380;
  background-color: #d5e1f2;

  & * {
    stroke: #335380;
  }
`;

export default { ApprovedTag };
