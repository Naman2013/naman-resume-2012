import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { primaryFont } from '../../styles/variables/fonts';
import { white } from '../../styles/variables/colors';

const CommunityPostHeader = ({
  errorOccurred,
  objectIconURL,
  showCreateNewPostButton,
  subtitleText,
  titleText,
}) =>
  <div className="communityPostHeader">
    <div className="left-container">
      <div className="title">
        {
          (objectIconURL && !errorOccurred) ? <img alt="Object icon" src={objectIconURL} height="55" /> : null
        }
        <h1 className="title-text" dangerouslySetInnerHTML={{ __html: !errorOccurred ? titleText : '' }} />
      </div>
      <div  className="subtitle" dangerouslySetInnerHTML={{ __html: !errorOccurred ? subtitleText : '' }} />
    </div>
    <div className="additional">
      <div className="button-nav">
        <span className="action-button">
          <Link className="button btn-primary" to="/reservations/slooh-recommends/">
            Reserve Telescope
          </Link>
        </span>
        {
          showCreateNewPostButton ? <span className="action-button">
            <Link className="button btn-primary" to="/publish-post">
              Create New Post
            </Link>
          </span> : null
        }
      </div>
    </div>
    <style jsx>{`
      .communityPostHeader {
        font-family: ${primaryFont};
        background: url(https://vega.slooh.com/assets/images/graphics/milkeyway_header.jpg) no-repeat;
        background-size: cover;
        min-height: 145px;
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 50px;
        margin-bottom: 20px;
        justify-content: space-between;
        width: 100%;
      }

      .left-container {
        display: flex;
        flex-direction: column;
      }

      .title {
        display: inline-flex;
        align-items: center;
      }

      .subtitle {
        color: ${white};
        text-transform: none;
        font-weight: normal;
        margin-top: 5px;
      }

      .title-text {
        margin: 0;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 36px;
        padding-left: 15px;
      }

      svg {
        margin-right: 10px;
      }

      .sponsored {
        text-align: right;
        margin-right: 30px;
        color: $turqoise;
      }

      .action-button {
        margin-right: 30px;
      }

      @media(max-width:375px) {
        .title-text {
          font-size:28px
        }
      }
    `}</style>
  </div>;

CommunityPostHeader.propTypes = {
  errorOccurred: PropTypes.bool,
  objectIconURL: PropTypes.string.isRequired,
  showCreateNewPostButton: PropTypes.bool,
  titleText: PropTypes.string.isRequired,
  subtitleText: PropTypes.string,
};

CommunityPostHeader.defaultProps = {
  errorOccurred: false,
  showCreateNewPostButton: false,
  subtitleText: '',
};

export default CommunityPostHeader;
