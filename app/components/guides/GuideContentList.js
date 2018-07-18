import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';
import style from './GuideContentList.style';

const GuideContentList = ({ list }) => (
  <div className="root">
    <AbelList list={list} />
    <style jsx>{style}</style>
  </div>
);

GuideContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

GuideContentList.defaultProps = {
  list: [],
};

export default GuideContentList;
