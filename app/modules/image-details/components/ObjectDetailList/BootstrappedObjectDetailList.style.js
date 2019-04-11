import css from 'styled-jsx/css';
import { astronaut, geyser, shadows, romance } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`
  .title-container {
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .wide-info-block {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .wide-info-item {
    flex: 1 1 0;
    border: 1px solid ${shadows};
    padding: 25px;
    text-align: left;
    max-height: 135px;
  }

  .title {
    padding: 10px;
    text-align: center;
    width: 100%;
  }

  .info {
    padding: 25px;
    border: 1px solid ${shadows};
  }

  .wide-info-block-header {
    font-weight: bold;
    font-size: 11px;
    padding: 10px;
    text-transform: uppercase;
  }

  :global(.wide-info-block-name) {
    display: block;
    font-size: 20px;
    padding: 10px;
    font-family: ${secondaryFont};
  }

  .detail-label {
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 10px;
  }

  .detail-text {
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 12px;
  }
  .detail-text-detail {
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 12px;
  }

  .detail-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 25px;
    -moz-box-shadow: 0 2px 4px 1px ${shadows};
    -webkit-box-shadow: 0 2px 4px 1px ${shadows};
    box-shadow: 0 2px 4px 1px ${shadows};
    background-color: ${romance};
  }
  .detail-note,
  .link {
    font-family: ${secondaryFont};
    font-size: 12px;
    color: ${geyser};
    font-style: italic;
  }

  .object-name {
    flex: 0 0 100%;
  }

  .half-info {
    width: 50%;
  }
`;