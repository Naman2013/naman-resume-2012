import React, { Component, PropTypes } from 'react';
import s from './MultiSelect.scss';

class MultiSelect extends Component {
  render() {
    const { options } = this.props;

    return (
      <div className={s.multiSelectRoot}>
        <ul className={s.multiSelectContainer}>
          <li className={s.multiSelectItem}>
            <button className={s.action}>
              <img alt="Observatory icon" src="assets/icons/observatory.png" height="20" /> Canary One
            </button>
          </li>
          <li className={s.multiSelectItem}>
            <button className={s.action}>
              <img alt="Observatory icon" src="assets/icons/observatory.png" height="20" /> Canary Two
            </button>
          </li>
          <li className={s.multiSelectItem}>
            <button className={s.action}>
              <img alt="Observatory icon" src="assets/icons/observatory.png" height="20" /> Canary Two
            </button>
          </li>
          <li className={s.multiSelectItem}>
            <button className={s.action}>
              <img alt="Observatory icon" src="assets/icons/observatory.png" height="20" /> Canary Two
            </button>
          </li>
          <li className={s.multiSelectItem}>
            <button className={s.action}>
              <img alt="Observatory icon" src="assets/icons/observatory.png" height="20" /> Canary Two
            </button>
          </li>
          <li className={s.multiSelectItem}>
            <button className={s.action}>
              <img alt="Observatory icon" src="assets/icons/observatory.png" height="20" /> Canary Two
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MultiSelect;
