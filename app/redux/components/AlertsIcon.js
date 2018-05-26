import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { red, white, black } from 'styles/variables/colors';
const AlertsIcon = ({ notificationCount }) => (
  <span className="root">
    <span className="fa fa-bell" />
    <span className={classnames('count', {
      zero: notificationCount === 0,
    })}>{notificationCount}</span>
    <style jsx>{`
      .root {
        display: block;
        position: relative;
      }
      .count {
        position: absolute;
        top: -5px;
        right: 5px;
        background-color: ${red};
        border-radius: 50%;
        width: 15px;
        height: 15px;
        font-size: 11px;
      }

      .zero {
        background-color: ${black};
        color: ${white};
      }
    `}</style>
  </span>
);

AlertsIcon.propTypes = {
  notificationCount: PropTypes.number,
};

AlertsIcon.defaultProps = {
  notificationCount: 0,
};

const mapStateToProps = ({
  alerts,
}) => ({
  notificationCount: alerts.notificationCount,
});


export default connect(mapStateToProps, null)(AlertsIcon);
