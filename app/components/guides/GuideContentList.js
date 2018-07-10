import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';

const GuideContentList = ({ list }) => (
  <div className="root">
    <AbelList list={list} />
  </div>
);

GuideContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

GuideContentList.defaultProps = {
  list: [],
};

export default GuideContentList;
