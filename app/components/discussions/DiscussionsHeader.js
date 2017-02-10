import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './discussions-header.scss';

const { string } = PropTypes;

const DiscussionsHeader = ({ title }) =>
  <header className={styles.DiscussionsHeader}>
    {title &&
      <h1 className="title-container">Discussions: <span className="title">{title}</span></h1>
    }
    {!title &&
      <h1 className="title-container">Discussions</h1>
    }
    <div className="button-nav">
      <Link className="button btn-primary" to="/discussions/new-thread">
        <i className="fa fa-plus" /> New Thread
      </Link>
    </div>
  </header>;

export default DiscussionsHeader;

DiscussionsHeader.propTypes = {
  title: string,
};
