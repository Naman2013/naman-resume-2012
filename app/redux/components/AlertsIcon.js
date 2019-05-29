import { astronaut, romance } from 'app/styles/variables/colors_tiles_v4';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const AlertsIcon = ({ notificationsCount, isActive }) => (
  <span className="root">
    <span className="icon-bell" />
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

      .icon-bell {
        font-size: 20px;
        line-height: 20px;
        height: 20px;
        display: inline-block;
      }

      .count {
        position: absolute;
        top: -5px;
        right: 4px;
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
