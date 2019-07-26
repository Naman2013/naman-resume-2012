import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

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
    {
      title: 'Questions to answer',
      linkURL: `/profile/public/${customerUUID}/qa/allunanswered`,
    },
  ];

  getPrivateNavItems = intl => [
    {
      title: intl.formatMessage(messages.MyQuestions),
      linkURL: '/profile/private/qa/asked',
    },
    {
      title: intl.formatMessage(messages.MyAnswers),
      linkURL: '/profile/private/qa/answeredbyme',
    },
    {
      title: intl.formatMessage(messages.QuestionsToAnswer),
      linkURL: '/profile/private/qa/allunanswered',
    },
  ];

  render() {
    const { params, intl } = this.props;

    return (
      <CenterColumn>
        <ContainerWithTitle
          title={intl.formatMessage(messages.QaSectionTitle)}
          activeFilter={params.filter}
          navItems={
            params.private
              ? this.getPrivateNavItems(intl)
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

export default injectIntl(ProfileQaContainer);
