import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';
import style from './GuideContentList.style';

const GuideContentList = ({ list }) => (
  <div className="root">
    <AbelList theme={{ horizontalList: { boxShadow: 'inset 0px 5px 20px -5px #e0e0e0' } }} list={list} />
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
