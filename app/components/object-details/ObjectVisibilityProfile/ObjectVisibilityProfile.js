import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import getDaysByMonth from 'utils/date-utils/get-days-by-month';
import Request from 'components/common/network/Request';
import { RISE_SET_TIMES } from 'services/objects';
import GridContainer from '../grid/GridContainer';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';

import {
  DEFAULT_MONTH,
  DEFAULT_DAY,
  DEFAULT_YEAR,
  MONTHS,
  YEARS,
} from './constants';

class ObjectVisibilityProfile extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
    obsId: PropTypes.string.isRequired,
  }

  state = {
    month: DEFAULT_MONTH,
    day: DEFAULT_DAY,
    year: DEFAULT_YEAR,
  }

  fetchRiseSetData = () => {
    console.log('TODO: implement rise/set data');
  }

  handleMonthChange = (event) => {
    this.setState({ month: event.target.value });
  }

  handleDayChange = (event) => {
    this.setState({ day: event.target.value });
  }

  handleYearChange = (event) => {
    this.setState({ year: event.target.value });
  }

  generateDays() {
    const { day, month, year } = this.state;
    const days = [];
    const totalDays = getDaysByMonth(month, year);
    for (let i = 0; i < totalDays; i += 1) {
      const value = i + 1;
      days.push({ value, name: value });
    }

    // validation for when the selected day exceeds the total days
    if (day > totalDays) { this.setState({ day: totalDays }); }

    return days;
  }

  render() {
    const {
      day,
      month,
      year,
      objectId,
      obsId,
    } = this.state;

    return (
      <GridContainer theme={{ margin: '20px 0 0 0' }}>
        <form
          method="POST"
        >
          <Request
            serviceURL={RISE_SET_TIMES}
            requestBody={{
              day,
              month,
              year,
              objectId,
              obsId,
            }}
            render={() => (
              <Fragment>
                <Row>
                  <StaticCell title="Rise &#38; set times">
                    <select value={this.state.month} onChange={this.handleMonthChange}>
                      {MONTHS.map(currentMonth => (
                        <option
                          key={`month-select-${currentMonth.value}`}
                          value={currentMonth.value}
                        >
                          {currentMonth.name}
                        </option>
                      ))}
                    </select>

                    <select value={this.state.day} onChange={this.handleDayChange}>
                      {this.generateDays().map(currentDay => (
                        <option
                          key={`day-select-${currentDay.value}`}
                          value={currentDay.value}
                        >
                          {currentDay.name}
                        </option>
                      ))}
                    </select>

                    <select value={this.state.year} onChange={this.handleYearChange}>
                      {YEARS.map(currentYear => (
                        <option
                          key={`year-select-${currentYear.value}`}
                          value={currentYear.value}
                        >
                          {currentYear.name}
                        </option>
                      ))}
                    </select>
                  </StaticCell>
                </Row>
                <Row>
                  <StaticCell title="Rise" hasBorderScale={[true]}>
                    <p>6&#58;08 am</p>
                  </StaticCell>
                  <StaticCell title="Transit" hasBorderScale={[true]}>
                    <p>10&#58;44 am</p>
                  </StaticCell>
                  <StaticCell title="Set">
                    <p>3&#58;18 pm</p>
                  </StaticCell>
                </Row>
                <Row>
                  <StaticCell title="Notes">
                    <p>Slightly difficult to see...</p>
                  </StaticCell>
                </Row>
              </Fragment>
            )}
          />
        </form>
      </GridContainer>
    );
  }
}

ObjectVisibilityProfile.propTypes = {};

export default ObjectVisibilityProfile;
