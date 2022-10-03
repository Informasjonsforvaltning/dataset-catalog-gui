import styled from 'styled-components';
import Button from '../../button';

const Page = styled.section``;

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
`;

const HostButton = styled(Button)`
  background-color: #d5e1f2;
  color: #335380;
  min-width: 220px;
  margin-left: 10px;

  & button {
    color: #335380;
  }

  & * {
    stroke: #000;
  }
`;

export default {
  AddDiv,
  Title,
  SubTitle,
  Page,
  HostButton,
};
