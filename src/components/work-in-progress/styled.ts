import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-top: 50px;
  padding-bottom: 100px;

  background-image: url(../../img/illustration-wip-ur.svg),
    url(../../img/illustration-wip-bl.svg);
  background-position: right top, left bottom;
  background-repeat: no-repeat;

  @media (max-width: 700px) {
    background-image: url(../../img/illustration-wip-ur.svg);
    background-position: right top;
  }

  & > img {
    height: 150px;
    width: 150px;
    margin: 10px;
  }

  & > h1 {
    font-size: 48px;
    margin: 20px;
  }

  & > p {
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
`;
