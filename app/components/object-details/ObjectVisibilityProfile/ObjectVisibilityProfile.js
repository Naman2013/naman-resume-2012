import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { intlShape, injectIntl } from 'react-intl';
import Request from 'components/common/network/Request';
import ViewOurGuide from '../view-our-guide';
import { RISE_SET_TIMES } from 'services/objects';
import { downwardFacingChevron } from 'styles/variables/iconURLs';
import GridContainer from '../grid/GridContainer';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';
import style from './ObjectVisibilityProfile.style';
import messages from './ObjectVisibilityProfile.messages';

import { DEFAULT_OBSID } from './constants';

const riseSetModel = {
  name: 'RISE_SET_MODEL',
  model: resp => ({
    rise: resp.riseText,
    transit: resp.transitText,
    set: resp.setText,
    subtitle: resp.subtitle,
    title: resp.title,
    notes: resp.notesText,
    guideHeader: resp.linkHeader,
    guideUrl: resp.linkUrl,
    guideLabel: resp.linkLabel,
    guideSubTitle: resp.linkTitle,
    hasRiseAndSetTimes: resp.hasRiseAndSetTimes,
    riseAndSetSelectors: resp.riseAndSetSelectors,
    observatories: resp.observatories,
  }),
};

const today = new Date();

class ObjectVisibilityProfile extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
  }

  state = {
    obsId: this.props.defaultObsId ? this.props.defaultObsId : DEFAULT_OBSID,
    activeDateIndex: 0,
    dateString: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
  }

  handleObservatoryChange = (event) => {
    this.setState({ obsId: event.target.value });
  }

  handleDateSelect = (dateString, index) => {
    this.setState({
      activeDateIndex: index,
      dateString,
    });
  }

  render() {
    const {
      dateString,
      obsId,
      activeDateIndex,
    } = this.state;

    const { objectId, intl } = this.props;

    return (
      <Request
        serviceURL={RISE_SET_TIMES}
        requestBody={{
          dateString,
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
                        titleHtml={riseSet.title}
                      >
                        {riseSet.riseAndSetSelectors
                          // && Array.isArray(riseSet.riseAndSetSelectors.dates)
                          // && riseSet.riseAndSetSelectors.dates > 0
                          && riseSet.riseAndSetSelectors.dates.map((date, index) => (
                          <div
                            key={date.dateString}
                            role="button"
                            tabIndex={index + 1}
                            className={cn('day-sell', { 'is-active': activeDateIndex === index })}
                            onClick={() => this.handleDateSelect(date.dateString, index)}
                          >
                            <div className="day-month" dangerouslySetInnerHTML={{ __html: date.dateLabel }} />
                          </div>
                        ))}
                        <div className="rise-set-subtitle" dangerouslySetInnerHTML={{
                          __html: riseSet.subtitle,
                        }}
                        />
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
                            {Array.isArray(riseSet.observatories)
                              && riseSet.observatories.length > 0
                              && Object.entries(riseSet.observatories).map(obs => (
                                <option value={obs[0]}>{obs[1]}</option>
                            ))}
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
  defaultObsId: PropTypes.string.isRequired,
};

export default injectIntl(ObjectVisibilityProfile);
