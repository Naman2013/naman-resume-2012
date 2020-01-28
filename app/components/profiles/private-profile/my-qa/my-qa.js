import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import MainContainer from '../../../../modules/ask-astronomer/containers/partials/MainContainer';
import DisplayAtBreakpoint from '../../../common/DisplayAtBreakpoint';
import { GuidePromoTile } from '../../../common/tiles/GuidePromoTile';
import { InfoTile } from '../../../common/tiles/InfoTile';

import style from './my-qa.style';

const { shape, func, number } = PropTypes;

const QA_TABS_DATA = {
  asked: {
    countText: (count, t, isPublic) =>
      isPublic
        ? t('Profile.AskedQuestions', { count })
        : t('Profile.YourAskedQuestions', { count }),
    getDropdownOptions: t => [
      {
        label: t('Profile.AllQuestions'), // todo hardcode text here
        value: 'asked',
      },
      { label: t('Profile.Answered'), value: 'answered' }, // todo hardcode text here
      {
        label: t('Profile.Unanswered'), // todo hardcode text here
        value: 'unanswered',
      },
    ],
  },
  answeredbyme: {
    countText: (count, t, isPublic) =>
      isPublic
        ? t('Profile.AnsweredQuestions', { count })
        : t('Profile.YourAnsweredQuestions', { count }),
    getDropdownOptions: t => [],
  },
  allunanswered: {
    countText: (count, t) => t('Profile.QuestionsToAnswers'),
    getDropdownOptions: t => [
      {
        label: t('Profile.AllUnanswered'), // todo hardcode text here
        value: 'allunanswered',
      },
      {
        label: t('Profile.ByMySpecialities'), // todo hardcode text here
        value: 'specialist',
      },
    ],
  },
};

@withTranslation()
class MyQa extends Component {
  static propTypes = {
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
    params: shape({}).isRequired,
    totalCount: number.isRequired,
    context: shape({}).isRequired,
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
              //subject={t('Profile.InfoTileSubject')}
              title={t('Profile.InfoTileSubject')}
              // title={t('Profile.InfoTileTitle')}
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
              dropdownOptions={QA_TABS_DATA[params.filter].getDropdownOptions(
                t
              )}
              changeAnswerState={this.getAstronomerQuestions}
            />
          )}
        </div>
        <DisplayAtBreakpoint screenLarge screenXLarge>
          <GuidePromoTile
            title={t('Profile.AskAnAstronomer')}
            icon="https://vega.slooh.com/assets/v4/common/membership/astronomer_member.png"
            buttonText={t('Profile.ViewGuide')}
            guideURL="/guides/topic/227"
          />
        </DisplayAtBreakpoint>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default MyQa;
