import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, geyser } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .root {
    ${faintShadow}
    background: white;
  }

  .tile-content-container {
    padding: 80px;
  }

  .description-container {
    width: 100%;
  }

  .title {
    font-family: ${secondaryFont};
    font-size: 20px;
    color: ${astronaut};
    border-bottom: 1px solid ${geyser};
    font-weight: 300;
    padding-bottom: 20px;
  }

  .subtitle {
    list-style-type: none;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid ${geyser};
    border-top: 1px solid ${geyser};
  }

  .content {
    display: flex;
    flex-direction: row;
  }

  .__html-blob-content-container__ {
    font-size: 19px;
    margin-bottom: 52px;
  }

  .additional-content {
    margin-left: 50px;
  }

  .root-mobile {
    ${faintShadow}
    background: white;
    width: 90%;
    min-height: 200px;
    padding: 25px;
    margin: 25px auto;
    min-width: 28%;
  }

  .subtitle-mobile {
    list-style-type: none;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 20px 0;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    overflow: elipsis;
  }

  .arrow-link {
    margin-left: 10px;
    cursor: pointer;
  }
`;
