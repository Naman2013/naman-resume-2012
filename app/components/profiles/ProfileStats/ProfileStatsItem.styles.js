import css from 'styled-jsx/css';
import { lightHeadedAstronaut, romance } from '../../../styles/variables/colors_tiles_v4';

export default css`
  .profile-stats {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${lightHeadedAstronaut};
  }

  .profile-stats.active:after {
    position: absolute;
    bottom: 19px;
    display: block;
    width: 100%;
    height: 10px;
    content: '';
    background: url('https://vega.slooh.com/assets/v4/common/icon_navarrow_blue.svg') no-repeat
      center center;
  }

  .profile-stats-label {
    font-size: 10px;
    line-height: 22px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .profile-stats :global(button) {
    width: 60px;
    height: 60px;
    padding: 10px;
    margin-top: 22px;
    font-size: 11px;
    line-height: 22px;
    letter-spacing: 1px;
    text-align: center;
  }

  :global(.profile-stats-icon) {
    font-size: 14px;
    color: ${romance};
  }
`;
