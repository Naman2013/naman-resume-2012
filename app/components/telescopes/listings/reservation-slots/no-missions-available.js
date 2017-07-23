import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class NoMissionsAvailable extends Component {
  render() {
    const {
      noReservationsIconURL,
      noReservationsExplanation } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'not-available': 1,
    });

    return(
      <li className={containerClassnames}>
        <div className="col-md-12 slot-description">
          <img className="slot-logo" src={noReservationsIconURL} width="38" alt={noReservationsExplanation} />
          <h4 className="slot-name">{noReservationsExplanation}</h4>
        </div>
      </li>
    );
  }
}

const { number, string, bool } = PropTypes;
NoMissionsAvailable.propTypes = {
  noReservationsIconURL: string.isRequired,
  noReservationsExplanation: string.isRequired,
};

export default NoMissionsAvailable;
