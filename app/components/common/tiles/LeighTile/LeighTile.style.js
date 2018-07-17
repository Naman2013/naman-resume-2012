import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { geyser } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';


export default css`
  .root {
    margin: 0 auto;
    padding: 0;
    padding: 40px;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    width: 96%;
  }

  .title {
    margin: 0;
    padding: 0;
    font-family: ${secondaryFont};
    font-weight: normal;
    font-size: 18px;
    text-transform: capitalize;
    color: #41566F;
    border-bottom: 1px solid ${geyser};
    padding-bottom: 30px;
  }

  .action-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
  }

  .action {
    margin: 0;
    padding: 0;
    font-family: ${primaryFont};
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 10px;
    color: #41566F;
  }

  @media ${screenMedium} {
    .root {
      width: 100%;
    }
  }
`;
