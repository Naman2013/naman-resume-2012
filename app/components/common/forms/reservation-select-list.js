import React, { Component, PropTypes } from 'react';
import style from './reservation-select-list.scss';

class ReservationSelectList extends Component {
  render() {
    const {
      options,
      name,
      activeSelection,
      callback,
      listHeight } = this.props;

    const inlineStyle = {
      height: `${listHeight}px`,
    };

    return(
      <div
        className="reservation-select-list"
        style={inlineStyle}
      >
        <input value="1" ref="test" className="multi-option-list-option" id="test" name="test" type="radio" />
        <label className="multi-option-list-label" htmlFor="test">Test 1</label>

        <input value="2" ref="test2" className="multi-option-list-option" id="test2" name="test" type="radio" />
        <label className="multi-option-list-label" htmlFor="test2">Test 2</label>
      </div>
    );
  }
}

ReservationSelectList.defaultProps = {
  listHeight: 340,
};

ReservationSelectList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  activeSelection: PropTypes.number,
  callback: PropTypes.func,
  listHeight: PropTypes.number,
};

export default ReservationSelectList;
