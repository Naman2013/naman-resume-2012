import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { astronaut, hawkesBlue, blue_tile_feat } from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .object-summary-tile-root {
    ${faintShadow};
    font-family: ${primaryFont};
    padding: 40px;
  }

  .title {
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    border-bottom: 1px solid ${hawkesBlue};
    padding-bottom: 15px;
    margin: 0;
  }

  .icon-border {
    width: 112px;
    height: 112px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border: 1px solid ${hawkesBlue};
  }

  .icon-inner-ring {
    background-image: url(${blue_tile_feat});
    width: 96px;
    height: 96px;
    margin: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vertical-line {
    width: 1px;
    background-color: ${hawkesBlue};
    margin: 0 auto;
  }

  .horizontal-line {
    background-color: ${hawkesBlue};
    height: 1px;
    width: 100%;
    margin: 0 auto;
  }

  .attribute-list, .action-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .attribute {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${hawkesBlue};
    padding: 10px 0;
  }

  .attribute-name {
    padding-left: 20px;
    width: 100%;
  }

  .action-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  .action-list li {
    padding: 0 5px;
  }

  .action-list li:first-child {
    flex: 2;
    padding: 0;
  }
`;
