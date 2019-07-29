import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .sky-chart-widget img {
    width: 100%;
  }

  :global(.sky-chart-widget-modal) {
    max-height: calc(100vh - 50px);
    justify-content: center;
  }

  :global(.sky-chart-widget-modal .modal-content) {
    width: auto;
  }
`;
