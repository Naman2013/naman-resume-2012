/***********************************
 * V4  Form Header Component
 *
 *
 *
 ***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import { astronaut, shadows } from 'app/styles/variables/colors_tiles_v4';
import { smallProfPic } from 'app/styles/mixins/utilities';
import classnames from 'classnames';

const { string } = PropTypes;

const FormHeader = ({ avatarURL, toggleInfo, showInfo }) => {
  return (
    <div>
      <div className="comment-title-container">
        <div className="comment-title-avatar-container">
          <div
            style={Object.assign({ margin: '0 auto' }, smallProfPic(avatarURL))}
          />
        </div>

        <div className="comment-title-text-container">
          <span className="comment-title-text">Start a discussion</span>
          <img
            className={classnames('action', {
              up: showInfo,
            })}
            onClick={toggleInfo}
            src="https://vega.slooh.com/assets/v4/common/arrow_down.svg"
            alt="expand"
          />
        </div>
      </div>

      <style jsx>{`
        .comment-title-container {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100px;
          color: ${astronaut};
        }
        .comment-title-avatar-container {
          display: inline-block;
          width: 100px;
          height: 100px;
          padding: 25px;
          border-top: 1px solid ${shadows};
          border-bottom: 1px solid ${shadows};
          border-left: 1px solid ${shadows};
        }
        .comment-title-text-container {
          border-bottom: 1px solid ${shadows};
          border-left: 1px solid ${shadows};
          border-right: 1px solid ${shadows};
          border-top: 1px solid ${shadows};
          border-top: 1px solid ${shadows};
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          font-size: 12px;
          font-weight: bold;
          height: 100px;
          padding: 0 50px;
          text-transform: uppercase;
        }

        .up {
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -o-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          transform: rotate(180deg);
          padding: 0;
        }
      `}</style>
    </div>
  );
};

FormHeader.defaultProps = {
  avatarURL: null,
  title: 'Post a Public Comment',
};
FormHeader.propTypes = {
  avatarURL: string,
  title: string,
};

export default FormHeader;
