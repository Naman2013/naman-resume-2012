import React from 'react';
import PropTypes from 'prop-types';

const TopicBodyContent = ({ title, content }) => (
  <div className="root">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

TopicBodyContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TopicBodyContent;
