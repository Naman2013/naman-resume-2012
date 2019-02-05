import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { questShield } from 'styles/variables/iconURLs';

export default css`
  .blue-shield {
    position: absolute;
    background: url(${questShield});
    background-size: cover;
    background-repeat: no-repeat;
    height: 78px;
    width: 78px;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
  }

  .container {
    width: 80%;
    margin: 0 auto;
  }

  .icon-container {
    display: block;
    position: relative;
    top: 65px;
    width: 100%;
    height: 40px;
  }

  .title {
    padding: 30px 0 20px 0;
    margin: 0;
    font-size: 14px;
    font-family: ${secondaryFont};
    font-weight: 300;
    font-size: 18px;
    border-bottom: none;
    padding-top: 135px;
    padding-bottom: 0;
    text-transform: initial;
    color: ${astronaut};
  }
`;
