import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import MainContainer from '../../../../modules/ask-astronomer/containers/partials/MainContainer';
import DisplayAtBreakpoint from '../../../common/DisplayAtBreakpoint';
import { GuidePromoTile } from '../../../common/tiles/GuidePromoTile';
import { InfoTile } from '../../../common/tiles/InfoTile';

import style from './my-qa.style';
import messages from './my-qa.messages';

const { shape, func, number } = PropTypes;

const QA_TABS_DATA = {
  asked: {
    countText: (count, t, isPublic) =>
      isPublic
        ? t('.AskedQuestions', { count })
        : t('.YourAskedQuestions', { count }),
    getDropdownOptions: t => [
      {
        label: t('.AllQuestions'), // todo hardcode text here
        value: 'asked',
      },
      { label: t('.Answered'), value: 'answered' }, // todo hardcode text here
      {
        label: t('.Unanswered'), // todo hardcode text here
        value: 'unanswered',
      },
    ],
  },
  answeredbyme: {
    countText: (count, t, isPublic) =>
      isPublic
        ? t('.AnsweredQuestions', { count })
        : t('.YourAnsweredQuestions', { count }),
    getDropdownOptions: t => [],
  },
  allunanswered: {
    countText: (count, t) => t('.QuestionsToAnswers'),
    getDropdownOptions: t => [
      {
        label: t('.AllUnanswered'), // todo hardcode text here
        value: 'allunanswered',
      },
      {
        label: t('.ByMySpecialities'), // todo hardcode text here
        value: 'specialist',
      },
    ],
  },
};

@withTranslation
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
    const { params } = this.props;
    const { filter } = params;
    this.getAstronomerQuestions({ answerState: filter, currentPage: 1 });
  }

  getAstronomerQuestions = data => {
    const { actions, params } = this.props;
    const { customerUUID } = params;
    actions.fetchAstronomerQuestions({ ...data, customerUUID });
  };

  render() {
    const { context, actions, totalCount, params, t } = this.props;

    return (
      <div className="root">
        <div className="main-block">
          {totalCount === 0 && params.filter === 'asked' && !params.public ? (
            <InfoTile
              //subject={t('.InfoTileSubject')}
              title={t('.InfoTileSubject')}
              // title={t('.InfoTileTitle')}
              // text="Text placeholder"
            />
          ) : (
            <MainContainer
              {...this.props}
              {...context}
              countText={QA_TABS_DATA[params.filter].countText(
                totalCount,
                t,
                !!params.public
              )}
              likeParams={{
                callSource: 'qanda',
              }}
              showDropdown={
                QA_TABS_DATA[params.filter].getDropdownOptions(t).length > 0
              }
              dropdownOptions={QA_TABS_DATA[params.filter].getDropdownOptions(t)}
              changeAnswerState={this.getAstronomerQuestions}
            />
          )}
        </div>
        <DisplayAtBreakpoint screenLarge screenXLarge>
          <GuidePromoTile
            title={t('.AskAnAstronomer')}
            icon="https://vega.slooh.com/assets/v4/common/membership/astronomer_member.png"
            buttonText={t('.ViewGuide')}
            guideURL="/guides/topic/227"
          />
        </DisplayAtBreakpoint>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default injectIntl(MyQa);
