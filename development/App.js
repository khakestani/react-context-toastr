import React from 'react';
import ToastrProvider from './../src/';
import './../src/styles/index.scss';
import './index.scss';
import Menu from './Menu';

export default () => (
  <div className="wrapper">
    <ToastrProvider position="bottom-left">
      <Menu />
    </ToastrProvider>
  </div>
);
