/** *********************************
* V4 MultipleChoiceItem
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './multiple-choice-item.style';

const {
  func,
  string,
} = PropTypes;


export const MultipleChoiceItem = (props) => {
  const {
    iconUrl,
    renderIcon,
    title,
    status,
  } = props;

  return (
    <div className="root">
      <div className="left">
        <div className="icon-container">
          {renderIcon ? renderIcon() : <img src={iconUrl} />}
        </div>
      </div>
      <div className="right">
        <span className="title-character" dangerouslySetInnerHTML={{ __html: title }} />
        <span className="status" dangerouslySetInnerHTML={{ __html: status }} />
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

MultipleChoiceItem.propTypes = {
  iconUrl: string,
  renderIcon: func,
  title: string.isRequired,
  status: string,

}
MultipleChoiceItem.defaultProps = {
  iconUrl: null,
  renderIcon: null,
  status: null,
}

export default MultipleChoiceItem;
