import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from '../../styles/variables/colors_tiles_v4';

export default css`
  .profile-stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${lightHeadedAstronaut};
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
`;
