import React from 'react';
import { white } from '../../styles/variables/colors';
import { backgroundImageCover } from '../../styles/mixins/utilities';

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
  .image-container {
    width: 90%;
  }
  .image {
    ${backgroundImageCover}
    background-position: center;
    margin-bottom: 20px;
    display: block;
  }

  .image:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: 68.49%;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
  .bold {
    font-weight: bold;
  }
  .header {
    text-align: center;
    font-weight: bold;
  }
`}</style>;
