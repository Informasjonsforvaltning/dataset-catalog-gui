import styled from 'styled-components';

const TableRow = styled.tr`
  && {
    display: flex;
    background-color: #ffffff;
    border-radius: 4px;
    margin-top: 5px;
    align-items: center;
    padding: 0 10px;

    :hover {
      background-color: #000;
      p {
        color: #fff;
      }

      svg,
      label {
        color: #000;
      }

      span {
        background-color: #fff !important;
      }
    }
  }
`;

export default { TableRow };
