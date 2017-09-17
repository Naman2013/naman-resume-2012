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
    <div className="title col-md-5 pull-left">
      <h1 className="header-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="header-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />
    </div>
    {
      showCreateNewPostButton ? <Link className="button btn-primary pull-right" to="/publish-post">Create new post</Link> : null
    }
    <style jsx>{`

      .pulseListHeader {
        font-family: ${primaryFont};
        background: url('https://vega.slooh.com/assets/images/graphics/milkeyway_header.jpg') no-repeat;
        background-size: cover;
        height: 145px;
        padding: 20px;
        position: relative;
      }

      .title {
        position: absolute;
        bottom: 20px;
        left: 0;
      }
      .button {
        position: absolute;
        bottom: 10px;
        right: 30px;
      }

      .header-title {
        margin: 0;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 35px;
        float: left;
      }

      .header-subtitle {
        font-size: 1em;
        margin: 0 0 20px;
        padding: 0;
        text-transform: none;
        font-weight: normal;
        color: ${white};
      }

      @media(max-width:375px){
        .title,
        .button{
          position:relative;
          float:none;
          left:auto;
          right:auto;
          right:auto;
          bottom:auto;
          float:none !important;
        }

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
