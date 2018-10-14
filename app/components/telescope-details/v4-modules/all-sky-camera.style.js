import css from 'styled-jsx/css';
import { hawkesBlue, astronaut } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`
  .root {
    padding: 0;
  }

  .content {
    padding: 30px 40px;
    color: ${astronaut};
    font-family: ${secondaryFont};
  }

  .vertical-line {
    width: 1px;
    height: 40px;
    margin: 0 auto;
    background-color: ${hawkesBlue};
  }

  .attribute-list {
    list-style-type: none;
    display: flex;
    padding: 20px 0;
    margin: 0 auto;
    justify-content: space-between;
    border-top: 1px solid ${hawkesBlue};
    border-bottom: 1px solid ${hawkesBlue};
  }

  .attribute-list li { font-size: 18px; }

  .copy {
    font-size: 19px;
    padding-top: 30px;
  }
`;
