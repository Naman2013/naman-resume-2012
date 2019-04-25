import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { lightHeadedAstronaut, hawkesBlue } from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .scheduled-by-tile-root {
    ${faintShadow}
    padding: 40px;
  }

  .title {
    margin: 0;
    margin-bottom: 30px;
    font-family: ${primaryFont};
    color: ${lightHeadedAstronaut};
    text-transform: uppercase;
    font-size: 11px;
  }

  .profile-photo { margin-bottom: 20px; }

  .profile-name {
    margin: 0;
    font-family: ${secondaryFont};
    color: ${lightHeadedAstronaut};
    font-weight: normal;
    font-size: 20px;
    border-bottom: 1px solid ${hawkesBlue};
    padding-bottom: 15px;
  }

  .list-attributes {
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    color: ${lightHeadedAstronaut};
  }

  .list-attributes li { padding: 10px 0; }

  .list-attributes li:first-child {
    border-right: 1px solid ${hawkesBlue};
    flex: 2;
  }

  .list-attributes li:last-child {
    padding-left: 10px;
  }

  .list-attributes li:last-child img {
    padding-right: 10px;
  }
`;
