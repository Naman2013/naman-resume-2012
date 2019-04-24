import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import { astronaut, hawkesBlue } from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .list-navigation {
    ${faintShadow}
    font-weight: normal;
    color: ${astronaut};
    font-family: ${secondaryFont};
    background: white;
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
  }

  .page-title {
    font-weight: normal;
    font-size: 18px;
    padding-left: 20px;
  }

  .item {
    flex-grow: 1;
    padding: 15px 20px;
    border-left: 1px solid ${hawkesBlue};
  }

  .item:first-child {
    border: none;
  }
`;
