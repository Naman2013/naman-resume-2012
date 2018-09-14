import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { romance, astronaut, shadows, lynch } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import {
  horizontalArrowRightAstronaut
} from 'styles/variables/iconURLs';

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
          {showResponse && <div className="title" dangerouslySetInnerHTML={{ __html: responseText }} />}
          <div className="event-label" dangerouslySetInnerHTML={{ __html: eventLabel }} />
          <div className="event-title" dangerouslySetInnerHTML={{ __html: eventTitle }} />
          <div dangerouslySetInnerHTML={{ __html: eventSubtitle }} />
          {hasLink && <div className="link-container">
              <Link to={linkUrl}>
                <span className="link-text" dangerouslySetInnerHTML={{ __html: linkLabel }} />
              </Link>
              <div className="arrow" />
          </div>}
        </div>
        <style jsx>{`
          .root {
            width: 90%;
            margin: 0 auto;
            background: ${romance};
            padding: 15px;
            color: ${astronaut};
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
            top: -10px;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background-color: ${shadows};
            color: ${romance};
            text-align: center;
          }

          .link-container {
            padding-top: 15px;
            border-top: 1px solid ${shadows};
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .link-text {
            color: ${lynch};
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
          }

          .event-title {
            font-family: ${secondaryFont};
            color: ${astronaut};
            font-size: 20px;
            padding-bottom: 15px;
          }

          .event-label {
            font-family: ${primaryFont};
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            color: ${astronaut};
            padding: 15px 0;
          }

          .arrow {
            background-image: url('${horizontalArrowRightAstronaut}');
            height: 15px;
            width: 15px;
            background-position: center;
            background-repeat: no-repeat;
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
