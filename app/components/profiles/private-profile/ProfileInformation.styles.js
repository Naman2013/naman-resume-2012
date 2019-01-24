import css from 'styled-jsx/css';
import {
  romance,
  nightfall,
  hawkesBlue,
  lightHeadedAstronaut,
} from '../../../styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont, helvetica } from '../../../styles/variables/fonts';
import { screenMedium, screenLarge } from '../../../styles/variables/breakpoints';

export default css`
  .profile-header {
    position: relative;
    min-height: 262px;
    width: 100%;
    background-color: ${nightfall};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  .profile-information {
    max-width: 940px;
    margin: 40px;
    background-color: ${romance};
    display: flex;
  }

  .profile-avatar img {
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-user-name {
    font-family: ${secondaryFont};
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 0 40px;
  }

  .profile-user-info-block {
    display: flex;
    flex-flow: column;
    color: ${lightHeadedAstronaut};
    width: 100%;
    max-width: 459px;
    border-right: 1px solid ${hawkesBlue};
  }

  .profile-user-info {
    display: flex;
    border-top: 1px solid ${hawkesBlue};
    font-family: ${helvetica};
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .profile-user-info div {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 40px;
  }

  .profile-user-statistics {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    font-family: ${helvetica};
  }

  @media ${screenMedium} {
    .profile-information {
      width: 100%;
      flex-flow: row wrap;
    }

    .profile-avatar {
      width: 100%;
      padding: 50px 40px 35px;
      border-right: none;
      border-bottom: 1px solid ${hawkesBlue};
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }

    .profile-avatar img {
      width: 80px;
      height: 80px;
    }

    .profile-user-name {
      justify-content: center;
      margin-top: 30px;
    }

    .profile-user-info-block {
      width: 54%;
    }

    .profile-user-info-block .profile-user-name {
      display: none;
    }

    .profile-user-info-block div {
      height: 100%;
    }

    .profile-user-info {
      flex-flow: column;
      border-top: none;
    }

    .profile-user-info div {
      width: 100%;
    }

    .profile-user-statistics {
      width: 46%;
      height: 175px;
      max-width: none;
      padding: 0 50px;
    }

    .profile-user-gravity-rank {
      border-right: none;
      border-bottom: 1px solid ${hawkesBlue};
    }
  }

  @media ${screenLarge} {
    .profile-information {
      width: 940px;
      flex-flow: row nowrap;
      height: 182px;
    }

    .profile-avatar {
      width: 180px;
      padding: 40px;
      border-right: 1px solid ${hawkesBlue};
    }

    .profile-avatar img {
      width: 100px;
      height: 100px;
    }

    .profile-user-name {
      justify-content: flex-start;
      margin-top: 0;
    }

    .profile-user-info-block {
      width: 100%;
    }

    .profile-user-info-block .profile-user-name {
      display: flex;
    }

    .profile-user-info {
      flex-flow: row nowrap;
      border-top: 1px solid ${hawkesBlue};
    }

    .profile-user-info div {
      width: 50%;
    }

    .profile-user-statistics {
      width: 100%;
      height: auto;
      max-width: 299px;
      padding: 0 40px;
    }

    .profile-user-gravity-rank {
      border-right: 1px solid ${hawkesBlue};
      border-bottom: none;
    }
  }
`;
