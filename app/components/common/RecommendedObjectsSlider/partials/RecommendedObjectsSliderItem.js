import React from 'react';
import PropTypes from 'prop-types';

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
}};
const RecommendedObjectsItem = ({
  description,
  detailList,
  hasIcon,
  iconURL,
  subTitle,
  title,
}) => (<div className="root">
      {hasIcon ? <div style={getIconStyle()} />: null}
      <div className="object-name" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="" dangerouslySetInnerHTML={{ __html: description }} />
      {detailList.map(item => <div className="section" dangerouslySetInnerHTML={text} />)}
      <style jsx>{`
        .mission-item {
          background-color: ${white};
          margin: 10px;
          padding: 25px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          max-width: 300px;
        }
        .category {
          margin-bottom: 15px;
        }
        .section {
          padding: 10px 0;
          border-top: 1px solid ${gray};
        }
        .object-name {
          margin: 10px 0 0 0;
          text-transform: uppercase;
          font-weight: bold;
        }
        .icon {
          margin-right: 15px;
        }
      `}</style>
    </div>);

export default RecommendedObjectsItem;
