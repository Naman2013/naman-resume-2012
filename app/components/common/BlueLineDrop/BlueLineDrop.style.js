import css from 'styled-jsx/css';
import { astronaut, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { dropShadowContainer } from 'styles/mixins/utilities';
export default css`
  .component-container {
    font-family: ${primaryFont};
    ${dropShadowContainer};
  }

  .title-container {
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 12px;
    border-bottom: 4px solid ${astronaut};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 85px;
  }

  .title {
    padding: 25px;
    text-align: center;
    width: 85%;
  }

  .action {
    padding-right: 10px;
  }

  .up {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    padding-right: 0;
    padding-left: 10px;
  }


  .container-detail-items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media ${screenMedium} {
    .container-detail-items {
      flex-direction: row;
    }

    .title {
      flex: 1;
      font-size: 12px;
      padding: 10px 0;
      text-align: center;
      width: 100%;
    }


  }
`;
