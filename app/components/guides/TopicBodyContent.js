import React from 'react';
import PropTypes from 'prop-types';
import RubyTitle from 'atoms/titles/RubyTitle';
import style from './TopicBodyContent.style';

const TopicBodyContent = ({ title, content }) => (
  <div className="root">
    <div className="title-wrapper">
      <RubyTitle text={title} />
    </div>
    <p>{content}</p>
    <style jsx>{style}</style>
  </div>
);

TopicBodyContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TopicBodyContent;
