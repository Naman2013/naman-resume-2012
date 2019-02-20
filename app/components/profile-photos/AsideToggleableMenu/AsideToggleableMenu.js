/** *********************************
* V4 AsideToggleableMenu
********************************* */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './AsideToggleableMenu.style';
import messages from './AsideToggleableMenu.messages';

const AsideToggleableMenu = ({ visible, optionsList, toggleMenuVisibility }) => {
  return (
    <div className="root" style={{ width: visible ? '70%' : '0' }}>
      <div className="heading">
        <FormattedMessage {...messages.MoreOptions} />
        <i className="fa fa-close" aria-hidden="true" onClick={toggleMenuVisibility} />
      </div>
      <div className="options-list">
        {optionsList.map(option => (
          <button className="option">{option.label}</button>
        ))}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

const {
  bool,
  arrayOf,
  shape,
  string,
  func,
} = PropTypes;

AsideToggleableMenu.propTypes = {
  visible: bool.isRequired,
  optionsList: arrayOf(shape({
    label: string,
    action: func,
  })),
  toggleMenuVisibility: func.isRequired,
};

AsideToggleableMenu.defaultProps = {
  optionsList: [],
};

export default AsideToggleableMenu;
