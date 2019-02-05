import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import styles from './slider-item.style';

const {
  string,
  arrayOf,
  bool,
  shape,
} = PropTypes;

const RecommendedQuestsItem = ({
  description,
  detailList,
  hasIcon,
  iconURL,
  subTitle,
  title,
}) => (
  <article className="card-quest">
      <div className="container">
        <div className="blue-shield" />
        <div className="icon-container">
          <img className="icon-content" alt="" width="40" height="40" src={'https://vega.slooh.com/assets/v4/icons/object_types/Nebula.png'} />
        </div>
        <h5 className="title">Custom TITLE</h5>
      </div>
    <style jsx>{styles}</style>
  </article>
);

export default RecommendedQuestsItem;
