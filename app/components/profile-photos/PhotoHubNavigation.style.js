import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { shadows, seashell } from '../../styles/variables/colors_tiles_v4';


export default css`
  .photohub-root {
    font-family: ${primaryFont};
  }
  .photohub-title {
    font-size: 14px;
    font-weight: 900;
    height: 62px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    border-bottom: 1px solid #d9dee4;
  }

  .photohub-nav-bar {
    display: flex;
    align-item: center;
    min-height: 65px;
    max-height: 65px; 
    justify-content: space-between;
    border-bottom: 1px solid #d9dee4;
  }

  .photohub-nav-block {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  :global(.photohub-nav-active) {
    box-sizing: border-box;
    border-bottom: 2px solid #41566f;
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
`;
