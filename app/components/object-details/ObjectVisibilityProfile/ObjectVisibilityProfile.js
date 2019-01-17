import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import { intlShape, injectIntl } from 'react-intl';
import getDaysByMonth from 'utils/date-utils/get-days-by-month';
import Request from 'components/common/network/Request';
import ViewOurGuide from '../view-our-guide';
import { RISE_SET_TIMES } from 'services/objects';
import { downwardFacingChevron } from 'styles/variables/iconURLs';
import GridContainer from '../grid/GridContainer';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';
import style from './ObjectVisibilityProfile.style';
import messages from './ObjectVisibilityProfile.messages';

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

const next7Days = [];
for (let i = 0; i < 7; i++) {
  const date = moment(new Date()).add(i, 'days');
  next7Days.push(date);
}

class ObjectVisibilityProfile extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
  }

  state = {
    month: DEFAULT_MONTH,
    day: DEFAULT_DAY,
    year: DEFAULT_YEAR,
    obsId: DEFAULT_OBSID,
    activeDateIndex: 0,
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

  handleDateSelect = (date, index) => {
    this.setState({
      activeDateIndex: index,
      day: date.date(),
      month: (date.month() + 1).toString(),
      year: date.year().toString(),
    });
  }

  render() {
    const {
      day,
      month,
      year,
      obsId,
      activeDateIndex,
    } = this.state;

    const { objectId, intl } = this.props;

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
              {riseSet.hasRiseAndSetTimes === true && (
              <div className="obs-visibility-root">
                <GridContainer theme={{ margin: '20px 0 0 0' }}>
                  <form
                    method="POST"
                  >
                    <Row wrap>
                      <StaticCell
                        flexScale={['100%', '75%']}
                        hasBorderScale={[true]}
                        title={intl.formatMessage(messages.RiseSetTimes)}
                      >
                        {next7Days.map((date, index) => (
                          <div
                            key={date.date()}
                            role="button"
                            tabIndex={index + 1}
                            className={cn('day-sell', { 'is-active': activeDateIndex === index })}
                            onClick={() => this.handleDateSelect(date, index)}
                          >
                            <div className="day-month">{MONTHS[date.month()].name}</div>
                            <div className="day-month">{date.date()}</div>
                          </div>
                        ))}
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
                      <StaticCell title={intl.formatMessage(messages.Rise)} hasBorderScale={[true]}>
                        <p>{ (fetchingContent) ? `${intl.formatMessage(messages.Loading)}...` : riseSet.rise }</p>
                      </StaticCell>
                      <StaticCell title={intl.formatMessage(messages.Transit)} hasBorderScale={[true]}>
                        <p>{ (fetchingContent) ? `${intl.formatMessage(messages.Loading)}...` : riseSet.transit }</p>
                      </StaticCell>
                      <StaticCell title={intl.formatMessage(messages.Set)}>
                        <p>{ (fetchingContent) ? `${intl.formatMessage(messages.Loading)}...` : riseSet.set }</p>
                      </StaticCell>
                    </Row>
                    <Row>
                      <StaticCell title={intl.formatMessage(messages.Notes)}>
                        <p>{ (fetchingContent) ? `${intl.formatMessage(messages.Loading)}...` : riseSet.notes }</p>
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
              )}
              <style jsx>{style}</style>
            </div>
          );
        }}
    />
    );
  }
}

ObjectVisibilityProfile.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ObjectVisibilityProfile);
