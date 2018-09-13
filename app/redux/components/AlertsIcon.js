import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { romance, astronaut } from 'styles/variables/colors_tiles_v4';
import {
  sloohLogoAstronaut,
  threeLinesAstronaut,
  telescopeAstronaut,
  searchAstronaut,
  userAstronaut,
} from 'styles/variables/iconURLs';
const AlertsIcon = ({ notificationsCount, isActive }) => (
  <span className="root">
    <span className={classnames('fa fa-bell', {
      'is-active': isActive,
    })}/>
    <span className={classnames('count', {
      zero: notificationsCount === 0,
    })}>{notificationsCount}</span>
    <style jsx>{`
      .root {
        display: block;
        position: relative;
      }

      .fa-bell {
        color: ${astronaut};
      }

      .fa-bell.is-active {
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

const mapStateToProps = ({
  alerts,
}) => ({
  notificationsCount: alerts.notificationsCount,
});


export default connect(mapStateToProps, null)(AlertsIcon);
