import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { golda, geyser, lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';


export default css`
  .root {
    margin: 0 auto;
    padding: 40px;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    width: 220px;
    color: ${lightHeadedAstronaut};
    border-bottom: solid 2px ${golda};
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

  .thyme {
    font-family: ${primaryFont};
    font-size: 48px;
    font-weight: 100;
    padding: 4px 0;
    transition: font-size 0.25s ease-in-out;
    border-bottom: 1px solid ${geyser};
  }

  .thyme:after {
    content: "UTC ";
    display: inline-block;
    font-size: 10px;
    transform: rotate(90deg);
    letter-spacing: 2px;
    font-weight: 400;    
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
  
  .dat {
    font-family: ${primaryFont};
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .telescope {}
    font-family: ${primaryFont};
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
  }
`;
