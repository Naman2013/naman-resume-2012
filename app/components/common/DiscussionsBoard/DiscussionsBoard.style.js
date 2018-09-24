import css from 'styled-jsx/css';
import { astronaut, romance, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { dropShadowContainer, customModalStylesV4 } from 'styles/mixins/utilities';
import { faintShadow } from 'styles/variables/shadows';

export default css`
  .root {
    font-family: ${primaryFont};
    color: ${astronaut};
    margin-bottom: 10px;
  }
  .shadowed-container {
    ${faintShadow}
  }

  .bordered-container {
    border: 1px solid ${shadows};
  }

  .margin {
    margin: 15px 0;
  }
  .comments-bar {
    font-size: 12px;
    margin: 15px 0;
    text-transform: uppercase;
    color: ${astronaut};
    background-color: ${romance};
    font-weight: bold;
    padding: 25px;
    ${faintShadow}
  }

  .flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .toggle-container {
    padding: 15px 0;
    border: 1px solid ${shadows};
  }

  .replies-list-contanier {
    display: flex;
    flex-direction: row;
  }

  .replies-list {
    flex: 0 0 93%;
  }

  .comment-list-item {
    border-bottom: 1px solid ${shadows};
  }

  .comment-list-item:last-child {
    border-bottom: 0;
  }


  .num-replies {
    width: 45px
  }

  .replies-number {
    float: left;
    /* Safari */
    -webkit-transform: rotate(90deg);
    /* Firefox */
    -moz-transform: rotate(90deg);
    /* IE */
    -ms-transform: rotate(90deg);
    /* Opera */
    -o-transform: rotate(90deg);
    display: block;
    transform-origin: 0 100%;
    line-height: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
    height: 30px;
    width: 100%;
    white-space: nowrap;
  }
`;
