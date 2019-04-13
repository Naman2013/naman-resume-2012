/* ********************************
 * V4 Private profile QA container
 ********************************* */

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

  getNavItems = intl => [
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
          navItems={this.getNavItems(intl)}
          parentPath="profile/private/qa"
          showNavigation
        >
          <QaContainer params={params}>
            <MyQa key={`qa-tab-${params.filter}`} />
          </QaContainer>
        </ContainerWithTitle>
      </CenterColumn>
    );
  }
}

export default injectIntl(ProfileQaContainer);
