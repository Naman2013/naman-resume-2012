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
  DEFAULT_OBSID,
  MONTHS,
  YEARS,
} from './constants';

const riseSetModel = {
  name: 'RISE_SET_MODEL',
  model: resp => ({
    rise: resp.riseText,
    transit: resp.transitText,
    set: resp.setText,
    notes: resp.notesText,
  }),
};

class ObjectVisibilityProfile extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
  }

  state = {
    month: DEFAULT_MONTH,
    day: DEFAULT_DAY,
    year: DEFAULT_YEAR,
    obsId: DEFAULT_OBSID,
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

  handleObservatoryChange = (event) => {
    this.setState({ obsId: event.target.value });
  }

  render() {
    const {
      day,
      month,
      year,
      obsId,
    } = this.state;

    const { objectId } = this.props;

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
            model={riseSetModel}
            render={({
              fetchingContent,
              modeledResponses: { RISE_SET_MODEL },
            }) => (
              <Fragment>
                <Row wrap>
                  <StaticCell
                    flexScale={['100%', '50%']}
                    hasBorderScale={[true]}
                    title="Rise &#38; set times"
                  >
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
                  <StaticCell title="Observatory" flexScale={['100%', '25%']}>
                    <select value={this.state.obsId} onChange={this.handleObservatoryChange}>
                      <option value="chile">Chile</option>
                      <option value="teide">Teide</option>
                    </select>
                  </StaticCell>
                </Row>
                <Row>
                  <StaticCell title="Rise" hasBorderScale={[true]}>
                    <p>{ (fetchingContent) ? 'Loading...' : RISE_SET_MODEL.rise }</p>
                  </StaticCell>
                  <StaticCell title="Transit" hasBorderScale={[true]}>
                    <p>{ (fetchingContent) ? 'Loading...' : RISE_SET_MODEL.transit }</p>
                  </StaticCell>
                  <StaticCell title="Set">
                    <p>{ (fetchingContent) ? 'Loading...' : RISE_SET_MODEL.set }</p>
                  </StaticCell>
                </Row>
                <Row>
                  <StaticCell title="Notes">
                    <p>{ (fetchingContent) ? 'Loading...' : RISE_SET_MODEL.notes }</p>
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
