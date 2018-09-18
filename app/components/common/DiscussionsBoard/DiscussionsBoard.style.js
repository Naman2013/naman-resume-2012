import css from 'styled-jsx/css';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { dropShadowContainer, customModalStylesV4 } from 'styles/mixins/utilities';

export default css`
  .root {
    font-family: ${primaryFont};
    color: ${astronaut};
    margin-bottom: 10px;
    background-color: ${romance};
  }
  .shadowed-container {
    ${dropShadowContainer}
  }
  .margin {
    margin: 15px 0;
  }
  .comments-bar {
    font-size: 12px;
    margin: 15px 0;
    text-transform: uppercase;
    color: ${romance};
    background-color: ${astronaut};
    font-weight: bold;
    padding: 25px;
    ${dropShadowContainer}
  }

  .flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
