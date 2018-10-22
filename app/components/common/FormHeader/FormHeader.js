/***********************************
* V4  Form Header Component
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { romance, astronaut, shadows } from 'styles/variables/colors_tiles_v4';
import { dropShadowContainer, smallProfPic } from 'styles/mixins/utilities';

const {
  arrayOf,
  any,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;


const FormHeader = ({
  avatarURL,
}) => (<div>
  <div className="comment-title-container">
    <div className="comment-title-avatar-container">
      <div style={Object.assign({ margin: '0 auto' }, smallProfPic(avatarURL))} />
    </div>
    <div className="comment-title-text-container">
      <span className="comment-title-text">
        Write a Public Comment
      </span>
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
      align-items: center;
      border-bottom: 1px solid ${shadows};
      border-left: 1px solid ${shadows};
      border-right: 1px solid ${shadows};
      border-top: 1px solid ${shadows};
      border-top: 1px solid ${shadows};
      display: flex;
      flex: 1;
      font-size: 12px;
      font-weight: bold;
      height: 100px;
      padding-left: 50px;
      text-transform: uppercase;
    }

    .comment-title-text {}
  `}</style>
</div>);

FormHeader.defaultProps = {
  avatarURL: null,
  title: 'Post a Public Comment'
}
FormHeader.propTypes = {
  avatarURL: string,
  title: string,
}


export default FormHeader;
