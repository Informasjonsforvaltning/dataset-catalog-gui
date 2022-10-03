import styled from 'styled-components';

const Button = styled.button`
  height: 100%;
  font-family: 'Heebo', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  background: none;
  border: none;
  color: white;
`;

const StartIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 8px;
`;

const EndIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 8px;
`;

const ButtonContainer = styled.span`
  height: 52px;
  border-radius: 4px;
  padding: 14px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #335380;

  :hover {
    color: white;
    background-color: black;
    > button {
      color: white;
      background-color: black;
    }
    & * {
      stroke: #fff;
    }
  }
`;

export default { Button, ButtonContainer, StartIcon, EndIcon };
