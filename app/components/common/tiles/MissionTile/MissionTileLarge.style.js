import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { geyser, lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';


export default css`
  .root {
    margin: 40px auto;
    padding: 0;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    width: 96%;
    color: ${lightHeadedAstronaut};
  }

  .left {
    width: 32%;
    border-right: 1px solid #d9dee5;
    height: 100%;
    padding: 40px;
    padding-right: 0;
    transition: width 0.3s ease-in-out;
  }

  .title {
    margin: 0;
    padding: 0;
    font-family: ${secondaryFont};
    font-weight: normal;
    font-size: 20px;
    text-transform: capitalize;
    border-bottom: 1px solid ${geyser};
    padding-bottom: 10px;
  }

  .telescope {
    padding-top: 10px;
    font-family: ${primaryFont};
    font-weight: 400;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .right {
    position: absolute;
    top: 0;
    left: calc(30% + 40px);
    padding: 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 47%;
    font-family: ${primaryFont};
  }

  .dat {
    padding-top: 20px;
    font-weight: 400;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .thyme {
    font-size: 46px;
    font-weight: 100;
    padding: 20px;
    transition: font-size 0.25s ease-in-out;
  }

  .thyme:after {
    content: "UTC";
    position: absolute;
    font-size: 10px;
    transform: rotate(90deg);
    letter-spacing: 2px;
    font-weight: 400;
    bottom: 80px;
  }

  @media ${screenMedium} {
    .left {
      width: 50%;
    }
    .right {
      left: calc(50% + 40px);
      width: 33%;
    }
    .dat {
      padding-top: 34px;
    }
    .thyme {
      font-size: 56px;
      padding: 5px;
      font-weight: 100;
    }
    .thyme:after {
      bottom: 69px;
    }
  }

`;
