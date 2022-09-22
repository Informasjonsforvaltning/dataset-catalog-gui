import styled from 'styled-components';

const RowCell = styled.td`
  && {
    padding-left: 5px;
  }
`;

const CellText = styled.p`
  && {
    font-family: 'Heebo', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #2d3741;
  }
`;

export default { RowCell, CellText };
