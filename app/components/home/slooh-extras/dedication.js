import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohExtrasTile from './slooh-extras-tile';
import style from './dedication.scss';

class Dedication extends Component {
  render() {
    return (
      <SloohExtrasTile title={this.props.title}>
        <div>
          <h5
            className={style.dedicationText}
          >
            Slooh is dedicated this day December 25th, 2003, to Blake Wallens
            and all those who perished in the attack of September 11th, 2001.
          </h5>
        </div>
      </SloohExtrasTile>
    );
  }
}

Dedication.propTypes = {
  title: PropTypes.string.isRequired
};

export default Dedication;
