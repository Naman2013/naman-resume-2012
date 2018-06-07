import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
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
}) => (<div className="root" key={uniqueId()}>
      {hasIcon ? <div style={getIconStyle()} />: null}
      <div className="object-name" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="" dangerouslySetInnerHTML={{ __html: description }} />
      <style jsx>{`
      `}</style>
    </div>);

export default RecommendedObjectsItem;
