import React, { PropTypes } from 'react';
import style from './call-to-action.scss';

function Header({ cancelPost }) {
  return (
    <div className="call-to-action-wrapper">
      <div className="header text-center">
        <h1 className="title">Publish a post</h1>
        <button onClick={cancelPost} className="btn-primary cancel-btn" type="button">Cancel This</button>
      </div>
    </div>
  );
}

Header.propTypes = {
  cancelPost: PropTypes.func.isRequired,
};

export default Header;
