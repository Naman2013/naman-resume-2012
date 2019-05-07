import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../../styles/variables/fonts';
import {
  astronaut,
  geyser,
  blue_tile_feat,
  golden,
} from '../../../../styles/variables/colors_tiles_v4';
import { resetMarginPadding } from '../../../../styles/variables/utils';
import {
  screenMedium,
  screenLarge,
} from '../../../../styles/variables/breakpoints';

export default css`
  div,
  h3,
  ul,
  li {
    ${resetMarginPadding}
  }

  .root {
    background: white;
  }

  .tile-content-container {
    font-family: ${secondaryFont};
  }

  .tile-content-container h1 {
    font-size: 20px;
    letter-spacing: 1px;
    padding: 25px 0;
    color: ${astronaut};
    border-bottom: 1px solid ${geyser};
    font-weight: 300;
  }

  .middle-content {
    width: 50%;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    margin-top: 40px;
  }

  .text-content {
    flex: 50%;
  }

  .text-content h2 {
    font-size: 18px;
    color: ${astronaut};
    letter-spacing: 1px;
    margin: 0;
    padding: 0;
  }

  .middle-content .guide-tile {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 250px;
    margin: 0 auto;
    background: url(${blue_tile_feat});
    text-align: center;
  }

  .middle-content .guide-tile .title {
    margin: 0;
    margin-bottom: 10px;
    padding-top: 100px;
    font-family: ${primaryFont};
    color: ${golden};
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 2px;
    font-size: 10px;
  }

  .middle-content .guide-tile .subTitle {
    margin: 0;
    font-family: ${secondaryFont};
    color: white;
    font-weight: 300;
    font-size: 20px;
    letter-spacing: 1px;
  }

  .guide-tile-frame {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
  }

  .bottom {
    transform: rotate(180deg);
    bottom: 0;
    left: 0;
  }

  .top-right {
    transform: rotate(90deg);
  }

  .plan-name {
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

  .author-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .excerpt-tile {
    display: none;
  }

  .excerpt-tile :global(.guide-tile-root) {
    width: 250px;
    height: 250px;
  }

  .excerpt-tile :global(.guide-tile-root .actions) {
    width: auto;
    margin: unset;
  }

  @media ${screenMedium} {
    .middle-content .guide-tile {
      width: 250px;
      margin: 0;
    }

    .text-content {
      padding-right: 40px;
    }

    .author-name img,
    .author-name span {
      display: none;
    }

    .tile-content-container {
      /* padding: 40px 50px; */
    }

    ul {
      display: flex;
      padding: 10px 0;
      margin-bottom: 20px;
      border-bottom: 1px solid ${geyser};
    }

    .handle-hover:hover .excerpt-tile {
      display: block;
    }

    .handle-hover .excerpt-tile :global(.description) {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .handle-hover .excerpt-tile :global(.title) {
      font-size: 18px;
    }

    .handle-hover .excerpt-tile :global(.sub-title) {
      padding: 12px 0;
    }

    .handle-hover:hover .guide-tile {
      display: none;
    }
  }

  @media ${screenLarge} {
    .tile-content-container {
      /* padding: 80px; */
    }

    .title {
      font-size: 24px;
    }
  }
`;
