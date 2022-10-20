import styled from 'styled-components';
import Button from '../../components/button';
import Breakpoint from '../../utils/styles/break-point';

const Page = styled.section`
  display: flex;
  flex-direction: column;

  tr:first-child {
    width: auto !important;
  }

  ${Breakpoint.SMALL} {
    tbody > tr {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      td {
        width: 100%;
        margin-bottom: 4px;
      }
    }
    thead {
      tr {
        flex-direction: column;
        margin-bottom: 30px;
        th {
          width: 100% !important;
          margin-bottom: 4px;
        }
      }
    }
  }
`;

const Title = styled.h1`
  width: 1110px;
  height: 58px;
  font-family: 'Heebo', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 47px;
  line-height: 58px;
  color: #2d3741;
`;

const SubTitle = styled.h2`
  width: 1110px;
  height: 30px;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 30px;
  color: #2d3741;
`;

const AddDiv = styled.div`
  display: flex;
  margin: 30px 0 20px 0;

  span:first-child {
    margin-right: 10px;
  }

  ${Breakpoint.MEDIUM} {
    flex-direction: column;
    span {
      width: 100%;
      margin: 0 0 10px 0;
    }
  }
`;

const HostButton = styled(Button)`
  background-color: #d5e1f2;
  color: #335380;
  min-width: 220px;
  margin-left: 10px;

  & button {
    color: #335380;
  }

  & svg {
    & * {
      stroke: #335380;
    }
  }

  ${Breakpoint.SMALL} {
    margin-left: 0px;
  }
`;

export default {
  AddDiv,
  Title,
  SubTitle,
  Page,
  HostButton,
};
