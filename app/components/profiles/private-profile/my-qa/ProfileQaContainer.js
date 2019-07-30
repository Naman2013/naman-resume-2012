import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import QaContainer from '../../../../modules/ask-astronomer/containers/QaContainer';
import { ContainerWithTitle } from '../../../common/ContainerWithTitle';
import CenterColumn from '../../../common/CenterColumn/CenterColumn';
import MyQa from './my-qa';

import messages from './ProfileQaContainer.messages';

const { shape } = PropTypes;

class ProfileQaContainer extends Component {
  static propTypes = {
    params: shape({}).isRequired,
    intl: intlShape.isRequired,
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

  getPrivateNavItems = (intl, canAnswerQuestions) => [
    {
      title: intl.formatMessage(messages.MyQuestions),
      linkURL: '/profile/private/qa/asked',
    },
    {
      title: intl.formatMessage(messages.MyAnswers),
      linkURL: '/profile/private/qa/answeredbyme',
      disabled: !canAnswerQuestions,
    },
    {
      title: intl.formatMessage(messages.QuestionsToAnswer),
      linkURL: '/profile/private/qa/allunanswered',
      disabled: !canAnswerQuestions,
    },
  ];

  render() {
    const { params, intl, canAnswerQuestions } = this.props;

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
          title={intl.formatMessage(messages.QaSectionTitle)}
          activeFilter={params.filter}
          navItems={
            params.private
              ? this.getPrivateNavItems(intl, canAnswerQuestions)
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
)(injectIntl(ProfileQaContainer));
