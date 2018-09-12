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
const AlertsIcon = ({ notificationsCount }) => (
  <span className="root">
    <span className="fa fa-bell" />
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
      .count {
        position: absolute;
        top: -5px;
        right: 5px;
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
