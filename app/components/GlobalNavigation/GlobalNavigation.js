import React from 'react';
import TopBar from './TopBar';
import Menu from './Menu';

const GlobalNavigation = () => (
  <div className="root">
    <TopBar />

    <Menu position="left" />

    <style jsx>{`
      .root {
        position: relative;
        margin: 0;
        padding:0;
      }
    `}</style>
  </div>
);


export default GlobalNavigation;
