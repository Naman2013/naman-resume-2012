import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import AbelList from '../common/AbelList';
import style from './TopicContentList.style';

const TopicContentList = ({ list, theme }) => (
  <div style={theme} className="root">
    <AbelList list={list} />
    <div className="button-container">
      <GenericButton
        onClickEvent={() => {}}
        text="Follow"
        icon="https://vega.slooh.com/assets/v4/common/comment.svg"
      />
    </div>
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
