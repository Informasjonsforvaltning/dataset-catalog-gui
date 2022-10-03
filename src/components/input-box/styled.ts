import styled from 'styled-components';

const TextField = styled.div`
  height: 54px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const InputPlaceHolder = styled.p`
  margin-left: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  font-family: 'Heebo', sans-serif;
  background-color: #ffffff;
  padding-right: 5px;
  line-height: 26px;
  border-radius: 50px;
  color: #6c737a;
`;

const Input = styled.input`
  position: absolute;
  margin: 0 15px 0 15px;
  width: 684px;
  font-size: 20px;
  font-family: 'Heebo', sans-serif;
  background: none;
  border: 0;
  :focus {
    outline: none;
    border: 0;
  }
`;

export default { TextField, InputPlaceHolder, Input };
