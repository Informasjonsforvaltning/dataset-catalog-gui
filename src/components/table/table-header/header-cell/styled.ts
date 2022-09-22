import styled from 'styled-components';

const Cell = styled.th`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 5px;
  }
`;

const Title = styled.p`
  && {
    font-family: 'Heebo', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #2d3741;
  }
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  padding-left: 5px;
`;

export default { Cell, Title, Icon };
