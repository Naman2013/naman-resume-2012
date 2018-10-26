import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { astronaut } from 'styles/variables/colors_tiles_v4';

export default css`
  .module-set {
    ${faintShadow}
    padding: 40px;
    margin: 0;
    margin-bottom: 20px;
    background: white;
  }

  .module-set:last-child {
    padding: 0;
  }

  .telescope-image {
    margin: -40px;
  }

  .title {
    padding: 40px 0;
    margin: 0;
    font-weight: normal;
    font-family: ${secondaryFont};
    font-size: 24px;
    color: ${astronaut};
  }

  .detail-actions {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    width: 100%;
  }

  .about-title {
    margin: 0;
    padding-bottom: 30px;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 800;
  }

  .about-content {
    margin: 0;
    font-family: ${secondaryFont};
    font-size: 19px;
  }

  .telescope-meta {
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 19px;
  }
`;
