import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';
import style from './GuideContentList.style';

const TopicContentList = ({ list }) => (
  <div className="root">
    <AbelList list={list} />
    <style jsx>{style}</style>
  </div>
);

TopicContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

TopicContentList.defaultProps = {
  list: [],
};

export default TopicContentList;
