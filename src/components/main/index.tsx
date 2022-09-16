import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';
import Header from '../header';
import SC from './styled';

const Main: FC = () => {
  return (
    <>
      <Header />
      <SC.Main>
        <Outlet />
      </SC.Main>
      <Footer />
    </>
  );
};

export default Main;
