/** *********************************
* V4 MultipleChoiceItem
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import styles from './multiple-choice-item.style';

const {
  bool,
  func,
  string,
} = PropTypes;

export const MultipleChoiceItem = (props) => {
  const {
    iconUrl,
    isActive,
    onClickItem,
    renderIcon,
    status,
    title,
    value,
    halfWidth,
  } = props;
  return (
    <div
      className={classnames('root', {
        'is-active': isActive,
        'half-width': halfWidth,
      })}
      data-value={value}
      onClick={onClickItem}
      key={uniqueId()}
    >
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
  isActive: bool,
  onClickItem: func.isRequired,

}
MultipleChoiceItem.defaultProps = {
  iconUrl: null,
  isActive: false,
  renderIcon: null,
  status: null,
}

export default MultipleChoiceItem;
