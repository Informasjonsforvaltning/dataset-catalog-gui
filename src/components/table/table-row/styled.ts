import styled from 'styled-components';

const TableRow = styled.tr`
  && {
    display: flex;
    background-color: #ffffff;
    border-radius: 4px;
    margin-top: 5px;
    align-items: center;
    padding: 12px 10px;

    :hover {
      background-color: #000;
      p {
        color: #fff;
      }

      label {
        color: #000;
      }

      span {
        background-color: #fff !important;
      }

      & * {
        stroke: #000;
      }
    }
  }
`;

export default { TableRow };
