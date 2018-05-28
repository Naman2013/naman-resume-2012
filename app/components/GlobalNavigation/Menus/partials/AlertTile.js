import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { white, darkGray, lightGray } from 'styles/variables/colors';
import { primaryFont } from 'styles/variables/fonts';

const {
  bool,
  func,
  number,
  string,
} = PropTypes;
const propTypes = {
  canDismiss: bool.isRequired,
  dismissAlert: func.isRequired,
  eventId: number.isRequired,
  eventLabel: string.isRequired,
  eventSubtitle: string.isRequired,
  eventTitle: string.isRequired,
  hasLink: bool.isRequired,
  linkLabel: string.isRequired,
  linkUrl: string.isRequired,
};

const defaultProps = {
};

class AlertTile extends Component {
  state = {
    loading: false,
    showResponse: false,
    responseText: '',
  }

  dismiss = () => {
    const { dismissAlert, eventId } = this.props;
    dismissAlert(eventId);
  }

  render() {
    const {
      canDismiss,
      eventId,
      eventLabel,
      eventSubtitle,
      eventTitle,
      hasLink,
      linkLabel,
      linkUrl,
    } = this.props;

    const {
      loading,
      showResponse,
      responseText,
    } = this.state;

    return (
      <div className="root" key={eventId}>
        <div className="tile-container">
          {canDismiss && <div className="dismiss" onClick={this.dismiss }><span className="fa fa-check" /></div>}
          {loading && <div className="dismiss"><span className="fa fa-spinner" /></div>}
          {showResponse && <div dangerouslySetInnerHTML={{ __html: responseText }} />}
          <h5 dangerouslySetInnerHTML={{ __html: eventLabel }} />
          <h3 dangerouslySetInnerHTML={{ __html: eventTitle }} />
          <h5 dangerouslySetInnerHTML={{ __html: eventSubtitle }} />

          {hasLink &&
            <Link to={linkUrl}>
              <span dangerouslySetInnerHTML={{ __html: linkLabel }} />
            </Link>
          }
        </div>
        <style jsx>{`
          .root {
            width: 90%;
            margin: 0 auto;
            background: ${white};
            padding: 15px;
            color: ${darkGray};
            font-family: ${primaryFont};
            margin-bottom: 10px;
          }

          .tile-container {
            position: relative;
          }

          .dismiss {
            position: absolute;
            cursor: pointer;
            right: -5px;
            top: -15px;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background-color: ${lightGray};
            color: ${white};
            text-align: center;
          }
        `}
        </style>
      </div>
    );
  }
}

AlertTile.defaultProps = defaultProps;
AlertTile.propTypes = propTypes;

export default AlertTile;
