import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import MainContainer from '../../../../containers/ask-astronomer/partials/MainContainer';
import DisplayAtBreakpoint from '../../../common/DisplayAtBreakpoint';
import { GuidePromoTile } from '../../../common/tiles/GuidePromoTile';
import { InfoTile } from '../../../common/tiles/InfoTile';

import style from './my-qa.style';
import messages from './my-qa.messages';

const { shape, func, number } = PropTypes;

const QA_TABS_DATA = {
  asked: {
    countText: (count, intl) => intl.formatMessage(messages.YourAskedQuestions, { count }),
    dropdownOptions: [
      { label: <FormattedMessage {...messages.AllQuestions} />, value: 'asked' },
      { label: <FormattedMessage {...messages.Answered} />, value: 'answered' },
      { label: <FormattedMessage {...messages.Unanswered} />, value: 'unanswered' },
    ],
  },
  answeredbyme: {
    countText: (count, intl) => intl.formatMessage(messages.YourAnsweredQuestions, { count }),
    dropdownOptions: [],
  },
  allunanswered: {
    countText: (count, intl) => intl.formatMessage(messages.QuestionsToAnswers),
    dropdownOptions: [
      { label: <FormattedMessage {...messages.AllUnanswered} />, value: 'allunanswered' },
      { label: <FormattedMessage {...messages.ByMySpecialities} />, value: 'specialist' },
    ],
  },
};

class MyQa extends Component {
  static propTypes = {
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
    params: shape({}).isRequired,
    totalCount: number.isRequired,
    context: shape({}).isRequired,
    intl: intlShape.isRequired,
  };

  componentDidMount() {
    const { actions, params } = this.props;
    actions.fetchAstronomerQuestions({ answerState: params.filter });
  }

  render() {
    const {
      context, actions, totalCount, params, intl,
    } = this.props;

    return (
      <div className="root">
        <div className="main-block">
          {totalCount === 0 && params.filter === 'asked' ? (
            <InfoTile
              subject={intl.formatMessage(messages.InfoTileSubject)}
              title={intl.formatMessage(messages.InfoTileTitle)}
              text="Text placeholder"
            />
          ) : (
            <MainContainer
              {...this.props}
              {...context}
              countText={QA_TABS_DATA[params.filter].countText(totalCount, intl)}
              likeParams={{
                callSource: 'qanda',
              }}
              showDropdown={QA_TABS_DATA[params.filter].dropdownOptions.length > 0}
              dropdownOptions={QA_TABS_DATA[params.filter].dropdownOptions}
              changeAnswerState={actions.fetchAstronomerQuestions}
            />
          )}
        </div>
        <DisplayAtBreakpoint screenLarge screenXLarge>
          <GuidePromoTile
            title={intl.formatMessage(messages.AskAnAstronomer)}
            icon="https://vega.slooh.com/assets/v4/common/membership/astronomer_member.png"
            buttonText={intl.formatMessage(messages.ViewGuide)}
          />
        </DisplayAtBreakpoint>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default injectIntl(MyQa);
