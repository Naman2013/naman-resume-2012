import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import {
  hawkesBlue,
  shadows,
  lightHeadedAstronaut,
  seashell,
  astronaut,
} from 'app/styles/variables/colors_tiles_v4';

export default css`
  .photohub-root {
    font-family: ${primaryFont};
  }
  .photohub-title {
    font-size: 14px;
    height: 62px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    border-bottom: 1px solid ${hawkesBlue};
  }
  
  .filter-shader {
    opacity: 0.9;
    background-color: #0a0c0e;
  }

  .photohub-nav-bar {
    display: flex;
    align-item: center;
    justify-content: space-between;
    margin-top: 10px;
    padding-bottom: 20px;
  }

  .photohub-nav-block {
    margin-right: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 1px;
  }

  :global(.photohub-nav-block a) {
    color: ${shadows};
    font-weight: bold;
  }

  :global(a.photohub-nav-active.photohub-nav-link) {
    color: ${astronaut};
    box-sizing: border-box;
    border-bottom: 2px solid ${astronaut};
  }

  .photohub-links {
    display: flex;
  }

  .photohub-dropdown {
    display: flex;
    align-items: center;
  }

  :global(.photohub-nav-link) {
    text-transform: uppercase;
    font-size: 11px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  :global(.photohub-nav-link,
  .photohub-nav-link:link,
  .photohub-nav-link:visited,
  .photohub-nav-link:active) {
    text-decoration: none;
  }

  .photohub-tools {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .photo-hub-search-input-field {
    display: block;
    width: 300px;
    height: 30px;
    padding: 10px;
    margin-left: 20px;
    font-size: 15px;
    font-family: ${secondaryFont};
    font-weight: normal;
    line-height: 1.5;
    background-color: ${seashell};
    background-clip: padding-box;
    border: 1px solid ${shadows};
    border-radius: .25rem;
  }

  .header {
    margin: 0 42px;
  }

  @media ${screenMedium} {
    .header {
      margin: 0;
    }

    .photohub-nav-bar {
      min-height: 65px;
      max-height: 65px;
      margin-top: 0px;
      padding-bottom: 0;
      border-bottom: 1px solid ${hawkesBlue};'
    }
  }
`;
