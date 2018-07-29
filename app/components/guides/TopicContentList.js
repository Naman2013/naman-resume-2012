import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';
import style from './TopicContentList.style';

const TopicContentList = ({ list, theme }) => (
  <div style={theme} className="root">
    <AbelList list={list} />
    <style jsx>{style}</style>
  </div>
);

TopicContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.shape({}),
};

TopicContentList.defaultProps = {
  list: [],
  theme: {},
};

export default TopicContentList;
