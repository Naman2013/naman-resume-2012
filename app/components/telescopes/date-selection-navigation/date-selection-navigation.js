import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';
import classnames from 'classnames';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import LastRefreshed from './last-refreshed';
import { fetchDateRanges } from '../../../modules/mission-slots-by-telescope/mission-slot-dates-actions';
import style from './date-selection-navigation.scss';

const MIN_DAYS = 0;
const MAX_DAYS = 7;

const mapStateToProps = ({ missionSlotDates, missionSlotsByTelescope }) => ({
  missionSlotDates,
  missionSlotsByTelescope,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchDateRanges,
  }, dispatch),
});

const INITIAL_REFRESH_TIME = 0;

@connect(mapStateToProps, mapDispatchToProps)
class DateSelectionNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastRefreshed: INITIAL_REFRESH_TIME,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleProgressClick = this.handleProgressClick.bind(this);
  }

  componentWillMount() {
    const { actions, obsId, telescopeId, domeId } = this.props;
    actions.fetchDateRanges({ obsId, telescopeId, domeId });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.routeRoot != this.props.routeRoot) {
      const requestedDate = nextProps.missionSlotDates.dateRangeResponse.dateList[0].reservationDate;
      const { actions, obsId, telescopeId, domeId } = nextProps;
      actions.fetchDateRanges({
        obsId,
        telescopeId,
        domeId,
        requestedDate,
      });

      this.setState({
        lastRefreshed: INITIAL_REFRESH_TIME,
      });
    }
  }

  setupTelescopeListingsRefresh() {
    const { missionSlotsByTelescope, obsId } = this.props;
    const { refreshIntervalSec } = missionSlotsByTelescope.reservationList;
    const { reservationDate } = this.props.missionSlotDates.dateRangeResponse.dateList[0];

    clearInterval(this.telescopeTimer);

    if(refreshIntervalSec) {
      this.telescopeTimer = setInterval(() => {
        this.handleDateChange(reservationDate);
      }, refreshIntervalSec * 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.telescopeTimer);
  }

  handleDateChange(requestedDate) {
    const { actions, obsId, telescopeId, domeId } = this.props;
    actions.fetchDateRanges({
      obsId,
      telescopeId,
      domeId,
      requestedDate,
    });
  }

  handlePreviousClick(event) {
    event.preventDefault();
    const { backEnabled, backDate } = this.props.missionSlotDates.dateRangeResponse.dateList[0];
    if(backEnabled) {
      this.handleDateChange(backDate);
    }
  }

  handleProgressClick(event) {
    event.preventDefault();
    const { forwardEnabled, forwardDate } = this.props.missionSlotDates.dateRangeResponse.dateList[0];
    if(forwardEnabled) {
      this.handleDateChange(forwardDate);
    }
  }

  render() {
    const {
      dateRangeResponse,
      dateRangeIsError,
      dateRangeIsFetching } = this.props.missionSlotDates;

    if(dateRangeIsFetching || dateRangeIsError || _.isEmpty(dateRangeResponse)) {
      return null;
    }

    const { lastRefreshed } = this.state;

    const {
      reservationDateFormatted,
      forwardEnabled,
      backEnabled } = dateRangeResponse.dateList[0];

    const progressPastStyle = classnames({
      'available': backEnabled,
      'fa fa-chevron-circle-left': 1,
    });

    const progressFutureStyle = classnames({
      'available': forwardEnabled,
      'fa fa-chevron-circle-right': 1,
    });

    this.setupTelescopeListingsRefresh();

    return (
      <div className="reserve-by-telescope-date-selection-navigation">

        <div className="progress-time-action">
          <button onClick={this.handlePreviousClick} className="button">
            <i className={progressPastStyle}></i> Back
          </button>
        </div>

        <div className="current-date-content">
          <h3 className="title">The night of</h3>
          <p className="current-time">{reservationDateFormatted}</p>
          <h5 className="last-updated">Last updated <LastRefreshed startCounter={lastRefreshed} />.</h5>
        </div>

        <div className="progress-time-action">
          <button onClick={this.handleProgressClick} className="button">
            Next Day <i className={progressFutureStyle}></i>
          </button>
        </div>

      </div>
    );
  }
}

DateSelectionNavigation.propTypes = {
  routeRoot: PropTypes.string,
  obsId: PropTypes.string.isRequired,
  telescopeId: PropTypes.string.isRequired,
  domeId: PropTypes.string.isRequired,
};

export default DateSelectionNavigation;
