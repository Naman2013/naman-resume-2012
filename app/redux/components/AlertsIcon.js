import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { romance, astronaut } from 'app/styles/variables/colors_tiles_v4';
import {
  sloohLogoAstronaut,
  threeLinesAstronaut,
  telescopeAstronaut,
  searchAstronaut,
  userAstronaut,
} from 'app/styles/variables/iconURLs';
const AlertsIcon = ({ notificationsCount, isActive }) => (
  <span className="root">
    <i
      className={classnames('i-bell', {
        'is-active': isActive,
      })}
    />
    <span
      className={classnames('count', {
        zero: notificationsCount === 0,
      })}
    >
      {notificationsCount}
    </span>
    <style jsx>{`
      .root {
        display: block;
        position: relative;
      }

      .icon {
        font-size: 18px;
        color: ${astronaut};
      }

      .icon.is-active:before {
        color: ${romance};
      }

      .count {
        position: absolute;
        top: -5px;
        right: 5px;
        color: ${romance};
        background-color: red;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        font-size: 11px;
      }

      .zero {
        background-color: ${astronaut};
        color: ${romance};
      }
    `}</style>
  </span>
);

AlertsIcon.propTypes = {
  notificationsCount: PropTypes.number,
};

AlertsIcon.defaultProps = {
  notificationsCount: 0,
};

const mapStateToProps = ({ alerts }) => ({
  notificationsCount: alerts.notificationsCount,
});

export default connect(
  mapStateToProps,
  null
)(AlertsIcon);
