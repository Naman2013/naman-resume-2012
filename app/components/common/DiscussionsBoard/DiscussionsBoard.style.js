import css from 'styled-jsx/css';
import {
  astronaut,
  romance,
  shadows,
  seashell,
  lightHeadedAstronaut,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  dropShadowContainer,
  customModalStylesV4,
} from 'app/styles/mixins/utilities';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .root {
    font-family: ${primaryFont};
    color: ${astronaut};
    margin-bottom: 10px;
  }
  .shadowed-container {
    ${faintShadow}
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .comments-search input {
    margin-right: 15px;
    background-color: ${seashell};
    border-radius: 4px;
    border: 0;
    box-shadow: inset 0 0 7px 0 ${shadows};
    font-family: ${secondaryFont};
    font-size: 16px;
    padding: 10px;
    resize: none;
    vertical-align: top;
    width: 150px;
  }

  .comments-bar .comments-search {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    border-top: 1px solid ${shadows};
  }

  .replies-list {
    flex: 0 0 93%;
  }

  .comment-replies-list {
    flex: 0 0 92.5%;
  }

  .comment-list-item {
    border-bottom: 1px solid ${shadows};
  }

  .comment-list-item:last-child {
    border-bottom: 0;
  }

  .num-replies {
    background-color: ${romance};
    width: 45px;
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

  :global(.discussions-pagination .pagination-root) {
    margin: 10px auto;
  }
`;
