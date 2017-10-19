import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { primaryFont } from '../../styles/variables/fonts';
import { white } from '../../styles/variables/colors';

const { string, bool } = PropTypes;

const PulseListHeader = ({
  subtitle,
  showCreateNewPostButton,
  title,
}) =>
  <div className="pulseListHeader">
    <div className="title">
      <h1 className="header-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="header-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />
    </div>
    {
      showCreateNewPostButton ? <Link className="btn-primary header-button" to="/publish-post">Create new post</Link> : null
    }
    <style jsx>{`

      .pulseListHeader {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        font-family: ${primaryFont};
        background: url('https://vega.slooh.com/assets/images/graphics/milkeyway_header.jpg') no-repeat;
        background-size: cover;
        min-height: 145px;
        padding: 50px;
        position: relative;
      }

      .title {

      }

      :global(.header-button) {
        margin: 15px 15px;
      }

      .header-title {
        margin: 0;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 35px;
      }

      .header-subtitle {
        font-size: 1em;
        margin: 0 0 20px;
        padding: 0;
        text-transform: none;
        font-weight: normal;
        color: ${white};
        clear: both;
      }

      @media(max-width:375px){
        .header-title {
          font-size: 35px;
        }

      }

    `}</style>
  </div>;

PulseListHeader.propTypes = {
  subtitle: string,
  showCreateNewPostButton: bool,
  title: string,
};

PulseListHeader.defaultProps = {
  subtitle: '',
  showCreateNewPostButton: false,
  title: '',
};

export default PulseListHeader;
