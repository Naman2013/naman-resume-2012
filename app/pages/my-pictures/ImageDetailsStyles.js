import React from 'react';
import { white } from '../../styles/variables/colors';

export const imageDetailsStyle = <style jsx>{`
  .my-pictures-container {
    padding: 20px;
  }
  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .left {
    flex: 3;
  }
  .right {
    flex: 1.5;
    background-color: ${white};
    padding: 10px;
  }
  .right-top {
    flex: 1.5;
    padding: 10px;
  }
`}</style>;
