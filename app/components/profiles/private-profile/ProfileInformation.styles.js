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
    z-index: 1;
  }

  .profile-information {
    max-width: 940px;
    margin: 40px;
    background-color: ${romance};
    display: none;
  }

  .profile-information-mobile {
    background-color: ${romance};
    width: 100%;
    heigth: 460px;
    padding: 30px 50px;
    font-family: ${primaryFont};
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
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
    position: relative;
  }

  .avatar-border {
    width: 94px;
    height: 94px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border: 1px solid ${hawkesBlue};
    background-color: ${romance};
  }

  .avatar-inner-ring {
    width: 85px;
    height: 85px;
    margin: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vertical-line {
    width: 1px;
    background-color: ${hawkesBlue};
    margin: 0 auto;
  }

  .horizontal-line {
    background-color: ${hawkesBlue};
    height: 1px;
    width: 100%;
    margin: 0 auto;
  }

  .user-info-list {
    list-style-type: none;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .user-info-list-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${hawkesBlue};
    padding: 15px 0;
    font-family: ${helvetica};
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${lightHeadedAstronaut};
  }

  .user-info-list-item.profile-user-name {
    font-family: ${secondaryFont};
    font-size: 20px;
    display: flex;
    align-items: center;
    text-transform: none;
  }

  .profile-information-mobile .profile-user-statistics {
    width: 100%;
    margin-top: 25px;
  }

  .profile-information-mobile :global(.button-container) {
    margin-top: 12px;
    font-family: ${helvetica};
  }

  :global(.profile-information-modal.stats-modal .stats-popover) {
    border: none;
    height: auto;
    position: static;
  }

  :global(.profile-information-modal.stats-modal .react-tabs__tab-panel) {
    max-height: calc(100vh - 214px);
  }

  @media ${screenMedium} {
    .profile-information {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
    }

    .profile-information-mobile {
      display: none;
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
      max-width: none;
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
      max-width: 460px;
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
      max-width: 300px;
      padding: 0 40px;
    }

    .profile-user-gravity-rank {
      border-right: 1px solid ${hawkesBlue};
      border-bottom: none;
    }
  }
`;
