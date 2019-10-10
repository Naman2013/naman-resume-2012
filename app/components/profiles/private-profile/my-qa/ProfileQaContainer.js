import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import QaContainer from '../../../../modules/ask-astronomer/containers/QaContainer';
import { ContainerWithTitle } from '../../../common/ContainerWithTitle';
import CenterColumn from '../../../common/CenterColumn/CenterColumn';
import MyQa from './my-qa';

const { shape } = PropTypes;
@withTranslation()
class ProfileQaContainer extends Component {
  static propTypes = {
    params: shape({}).isRequired,
  };

  getPublicNavItems = customerUUID => [
    {
      title: 'Questions',
      linkURL: `/profile/public/${customerUUID}/qa/asked`,
    },
    {
      title: 'Answers',
      linkURL: `/profile/public/${customerUUID}/qa/answeredbyme`,
    },
  ];

  getPrivateNavItems = (t, canAnswerQuestions) => [
    {
      title: t('Profile.MyQuestions'),
      linkURL: '/profile/private/qa/asked',
    },
    {
      title: t('Profile.MyAnswers'),
      linkURL: '/profile/private/qa/answeredbyme',
      disabled: !canAnswerQuestions,
    },
    {
      title: t('Profile.QuestionsToAnswer'),
      linkURL: '/profile/private/qa/allunanswered',
      disabled: !canAnswerQuestions,
    },
  ];

  render() {
    const { params, t, canAnswerQuestions } = this.props;

    let myAskData = null;
    if (this.props) {
      if (this.props.privateProfileData) {
        if (this.props.privateProfileData.askAnAstronomerData) {
          myAskData = this.props.privateProfileData.askAnAstronomerData;
        }
      } else if (this.props.data) {
        myAskData = this.props.data.askAnAstronomerData;
      }
    }

    return (
      <CenterColumn>
        <ContainerWithTitle
          title={t('Profile.QaSectionTitle')}
          activeFilter={params.filter}
          navItems={
            params.private
              ? this.getPrivateNavItems(t, canAnswerQuestions)
              : this.getPublicNavItems(params.customerUUID)
          }
          parentPath="profile/private/qa"
          showNavigation
        >
          <QaContainer params={params}>
            <MyQa key={`qa-tab-${params.filter}`} isPrivate={params.private} />
          </QaContainer>
        </ContainerWithTitle>
      </CenterColumn>
    );
  }
}

const mapStateToProps = ({ astronomerQuestions }) => ({
  canAnswerQuestions: astronomerQuestions.canAnswerQuestions,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileQaContainer);
