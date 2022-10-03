import styled from 'styled-components';
import Tag from '..';

const PublishedTag = styled(Tag)`
  background-color: #335380;
  color: #fff;

  & * {
    stroke: #fff;
  }
`;

export default { PublishedTag };
