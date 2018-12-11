import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import getDaysByMonth from 'utils/date-utils/get-days-by-month';
import Request from 'components/common/network/Request';
import ViewOurGuide from '../view-our-guide';
import { RISE_SET_TIMES } from 'services/objects';
import { downwardFacingChevron } from 'styles/variables/iconURLs';
import GridContainer from '../grid/GridContainer';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';
import style from './ObjectVisibilityProfile.style';

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
    guideHeader: resp.linkHeader,
    guideUrl: resp.linkUrl,
    guideLabel: resp.linkLabel,
    guideSubTitle: resp.linkTitle,
    hasRiseAndSetTimes: resp.hasRiseAndSetTimes,
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
        }) => {
          const riseSet = RISE_SET_MODEL || {};
          return (
            <div>
              {riseSet.hasRiseAndSetTimes === true && <div className="obs-visibility-root">
                <GridContainer theme={{ margin: '20px 0 0 0' }}>
                  <form
                    method="POST"
                  >
                    <Row wrap>
                      <StaticCell
                        flexScale={['100%', '75%']}
                        hasBorderScale={[true]}
                        title="Rise &#38; set times"
                      >
                        <div className="select-field">
                          <label
                            className="option-label"
                            htmlFor="select-month"
                          >
                            <span className="field-value-name">
                              {MONTHS.filter(filterMonth => filterMonth.value == this.state.month)[0].name}
                            </span>
                            <img alt="" width="8" src={downwardFacingChevron} />
                          </label>
                          <select
                            className="select"
                            id="select-month"
                            value={this.state.month}
                            onChange={this.handleMonthChange}
                          >
                            {MONTHS.map(currentMonth => (
                              <option
                                key={`month-select-${currentMonth.value}`}
                                value={currentMonth.value}
                              >
                                {currentMonth.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="select-field">
                          <label
                            className="option-label"
                            htmlFor="select-day"
                          >
                            <span className="field-value-name">
                              {this.generateDays().filter(filterDay => filterDay.value == this.state.day)[0].name}
                            </span>
                            <img alt="" width="8" src={downwardFacingChevron} />
                          </label>
                          <select
                            className="select"
                            id="select-day"
                            value={this.state.day}
                            onChange={this.handleDayChange}
                          >
                            {this.generateDays().map(currentDay => (
                              <option
                                key={`day-select-${currentDay.value}`}
                                value={currentDay.value}
                              >
                                {currentDay.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="select-field">
                          <label
                            className="option-label"
                            htmlFor="select-year"
                          >
                            <span className="field-value-name">
                              {YEARS.filter(filterYear => filterYear.value == this.state.year)[0].name}
                            </span>
                            <img alt="" width="8" src={downwardFacingChevron} />
                          </label>
                          <select
                            className="select"
                            id="select-year"
                            value={this.state.year}
                            onChange={this.handleYearChange}
                          >
                            {YEARS.map(currentYear => (
                              <option
                                key={`year-select-${currentYear.value}`}
                                value={currentYear.value}
                              >
                                {currentYear.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </StaticCell>
                      <StaticCell title="Observatory" flexScale={['100%', '25%']}>
                        <div className="select-field">
                          <label
                            className="option-label"
                            htmlFor="select-obsId"
                          >
                            <span className="field-value-name">
                              {this.state.obsId}
                            </span>
                            <img alt="" width="8" src={downwardFacingChevron} />
                          </label>
                          <select
                            className="select"
                            id="select-obsId"
                            value={this.state.obsId}
                            onChange={this.handleObservatoryChange}
                          >
                            <option value="chile">Chile</option>
                            <option value="teide">Teide</option>
                          </select>
                        </div>
                      </StaticCell>
                    </Row>
                    <Row>
                      <StaticCell title="Rise" hasBorderScale={[true]}>
                        <p>{ (fetchingContent) ? 'Loading...' : riseSet.rise }</p>
                      </StaticCell>
                      <StaticCell title="Transit" hasBorderScale={[true]}>
                        <p>{ (fetchingContent) ? 'Loading...' : riseSet.transit }</p>
                      </StaticCell>
                      <StaticCell title="Set">
                        <p>{ (fetchingContent) ? 'Loading...' : riseSet.set }</p>
                      </StaticCell>
                    </Row>
                    <Row>
                      <StaticCell title="Notes">
                        <p>{ (fetchingContent) ? 'Loading...' : riseSet.notes }</p>
                      </StaticCell>
                    </Row>
                  </form>
                </GridContainer>
                <ViewOurGuide
                  guideHeader={riseSet.guideHeader}
                  guideTitle={riseSet.guideLabel}
                  guideUrl={riseSet.guideUrl}
                  guideSubTitle={riseSet.guideSubTitle}
                />
              </div>
              }
              <style jsx>{style}</style>
            </div>
        );
      }}
    />
    );
  }
}

ObjectVisibilityProfile.propTypes = {};

export default ObjectVisibilityProfile;
