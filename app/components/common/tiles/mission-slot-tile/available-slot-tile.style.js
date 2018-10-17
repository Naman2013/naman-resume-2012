import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { astronaut, hawkesBlue } from 'styles/variables/colors_tiles_v4';

export default css`
  .available-slot-root {
    padding: 40px;
    color: white;
    background-color: #34455b;
  }

  .object-title {
    margin: 0;
    padding-bottom: 20px;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: normal;
    font-family: ${secondaryFont};
    border-bottom: 1px solid #283749;
  }

  .time {
    display: flex;
    align-items: baseline;
    border-bottom: 1px solid #283749;
    padding: 15px 0;
  }

  .time p {
    font-family: ${primaryFont};
    margin: 0;
  }

  .time p:first-child {
    margin: 0;
    font-size: 48px;
    font-weight: 300;
  }

  .time p:last-child {
    font-size: 10px;
    transform: rotate(90deg) translateX(-5px);
  }

  .attendee-info {
    list-style-type: none;
    font-family: ${primaryFont};
    font-size: 12px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    text-transform: uppercase;
    padding-top: 10px;
  }
`;
