import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from '../../styles/variables/breakpoints';
import { shadows } from '../../styles/variables/colors_tiles_v4';
import { faintShadow } from '../../styles/variables/shadows';
import { secondaryFont } from '../../styles/variables/fonts';

export default css`
  .card-wrapper {
    width: 90%;
    margin: 15px 5% 0 5%;
    ${faintShadow}
    text-decoration: inherit;
  }

  .card-wrapper:active,
  .card-wrapper:focused,
  .card-wrapper:visited {
    color: inherit;
  }

  .story-card {
    display: flex;  
    flex-direction: column; 
    height: 400px;
  }

  .header {
    height: 80px;
    width: 100%;
    display: flex;
    flex: 0.25;
  }

  .header-tile {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 11px;
  }

  .left {
    border-right: 0.5px solid ${shadows};
  }

  .right {
    border-left: 0.5px solid ${shadows};
  }

  .logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.3;
  }

  .logo-border {
    padding: 5px;
    border-radius: 50%;
    border: 1px solid ${shadows};
    width: 100px;
    margin-bottom: 20px;
  }

  .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .title {
    font-family: ${secondaryFont};
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    text-transform: uppercase;
    margin: 0 15%;
    flex: 0.3;
  }

  .author {
    font-size: 11px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    text-transform: uppercase;
    flex: 0.15;
  }

  @media ${screenMedium} {
    .card-wrapper {
      width: 32%;
      margin: 15px 0 0 0;
    }
  }

  @media ${screenLarge} {
    .card-wrapper {
      width: 32%;
      margin: 15px 0 0 0;
    }
  }
`;
