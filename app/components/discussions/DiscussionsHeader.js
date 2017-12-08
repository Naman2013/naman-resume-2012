import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './discussions-header.scss';
import { white } from '../../styles/variables/colors';

const { arrayOf, string } = PropTypes;

const getHeaderStyle = imgUrl => ({
  backgroundImage: `url(${imgUrl})`,
  backgroundSize: 'cover',
});
const DiscussionsHeader = ({ title, newThreadUrl, imgUrl }) =>
  <header style={imgUrl && getHeaderStyle(imgUrl)} className={styles.DiscussionsHeader}>
    {title &&
      <div className="title-container"><Link to="/discussions/" className="discussions-link">Discussions:</Link> <span dangerouslySetInnerHTML={{ __html: title }} className="title" /></div>
    }
    {!title &&
      <div className="title-container"><Link to="/discussions/" className="discussions-link">Discussions</Link></div>
    }
    <div className="button-nav">
      <Link className="button btn-primary" to={newThreadUrl || '/discussions/new-thread'}>
        <i className="fa fa-plus" /> New Thread
      </Link>
    </div>
    <style jsx global>{`
      .discussions-link {
        color: ${white};
      }
    `}</style>
  </header>;

DiscussionsHeader.defaultProps = {
  title: undefined,
  imgUrl: undefined,
  newThreadUrl: '',
};

DiscussionsHeader.propTypes = {
  title: string,
  imgUrl: string,
  newThreadUrl: string,
};

export default DiscussionsHeader;
