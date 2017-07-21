import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import style from './call-to-action.scss';

function Header({ cancelPost }) {
  return (
    <div className="call-to-action-wrapper">
      <div className="header text-center">
        <h1 className="title">Publish a post</h1>
        <div className="cta-container">
          <Link className="btn-primary cancel-btn" to="/help/posting-guidelines">Guidelines</Link>
          <button onClick={cancelPost} className="button btn-primary cancel-btn" type="button">Cancel This</button>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  cancelPost: PropTypes.func.isRequired,
};

export default Header;
