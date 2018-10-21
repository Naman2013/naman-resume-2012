import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import styles from './slider-item.style';
const {
  string,
  arrayOf,
  number,
  bool,
  shape,
} = PropTypes;

const propTypes = {
  description: string,
  detailList: arrayOf(shape({
    label: string,
    text: string,
  })),
  hasIcon: bool,
  iconURL: string,
  subTitle: string,
  title: string,
};

const getIconStyle = (iconURL) => ({
  backgroundImage: iconURL,
});

const RecommendedObjectsItem = ({
  description,
  detailList,
  hasIcon,
  iconURL,
  subTitle,
  title,
}) => (<div  key={uniqueId()} className="card-object">
      <div className="object-icon">{hasIcon ? <div style={getIconStyle()} />: null}</div>
      <div className="object-name" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="list-item" dangerouslySetInnerHTML={{ __html: description }} />
      <style jsx>{styles}</style>
    </div>);

export default RecommendedObjectsItem;
