import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { geyser, lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';


export default css`
  .root {
    position: relative;
    margin: 40px auto;
    padding: 0;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    width: 100%;
    color: ${lightHeadedAstronaut};
    display: flex;
  }

  .left {
    flex: 50%;
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
    flex: 50%;
    padding: 40px;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 50%;
    font-family: ${primaryFont};
    display: flex;
  }

  .dat {
    align-self: flex-end;
    font-weight: 400;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .thyme {
    align-self: flex-end;
    font-size: 46px;
    line-height: 46px;
    font-weight: 100;
    transition: font-size 0.25s ease-in-out;
  }

  .utc {
    font-size: 10px;
    transform: rotate(90deg);
    letter-spacing: 2px;
    font-weight: 400;
    position: absolute;
    bottom: 30px;
    right: 15px;
  }

  @media ${screenMedium} {
    .left {
      flex: 40%;
    }
    .right {
      flex: 60%;
    }
    .thyme {
      font-size: 56px;
      line-height: 56px;
      font-weight: 100;
    }
  }

`;
