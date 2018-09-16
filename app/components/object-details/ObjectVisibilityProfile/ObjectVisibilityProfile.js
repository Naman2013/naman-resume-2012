import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDaysByMonth from 'utils/date-utils/get-days-by-month';
import GridContainer from '../grid/GridContainer';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';

import {
  DEFAULT_MONTH,
  DEFAULT_DAY,
  DEFAULT_YEAR,
  MONTHS,
} from './constants';


class ObjectVisibilityProfile extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
    obsId: PropTypes.string.isRequired,
  }

  state = {
    riseAndSetTimeAPIResponse: undefined,
    fetching: false,
    month: DEFAULT_MONTH,
    day: DEFAULT_DAY,
    year: DEFAULT_YEAR,
  }

  fetchRiseSetData = () => {
    console.log('TODO: implement rise/set data');
  }

  handleMonthChange = (event) => {
    this.setState(() => ({ month: event.target.value }));
  }

  handleDayChange = (event) => {
    console.log(event.target.value);
  }

  handleYearChange = (event) => {
    console.log(event.target.value);
  }

  generateDays() {
    const { month, year } = this.state;
    const days = [];
    const totalDays = getDaysByMonth(month, year);
    for (let i = 0; i < totalDays; i += 1) {
      const value = i + 1;
      days.push({ value, name: value });
    }
    return days;
  }

  render() {
    return (
      <GridContainer theme={{ margin: '20px 0 0 0' }}>
        <form
          method="POST"
        >
          <Row>
            <StaticCell title="Rise &#38; set times">
              <select value={this.state.month} onChange={this.handleMonthChange} id="month-select">
                {MONTHS.map(month => (
                  <option
                    key={`month-select-${month.value}`}
                    value={month.value}
                  >
                    {month.name}
                  </option>
                ))}
              </select>

              <select onChange={this.handleChangeDay} id="day-select">
                {this.generateDays().map(day => (
                  <option
                    key={`day-select-${day.value}`}
                    value={day.value}
                  >
                    {day.name}
                  </option>
                ))}
              </select>

              <select onChange={this.handleChangeYear} id="year-select">
                <option value="2004">2004</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
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
        </form>
      </GridContainer>
    );
  }
}

ObjectVisibilityProfile.propTypes = {};

export default ObjectVisibilityProfile;
