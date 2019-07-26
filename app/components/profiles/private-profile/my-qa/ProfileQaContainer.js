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

  getNavItems = (intl, AskAstronomerData) => {
    //build the nav options based on the API data returned about member's account tier
    let navOptions = [];

    navOptions.push({
      title: intl.formatMessage(messages.MyQuestions),
      linkURL: '/profile/private/qa/asked',
    });

    navOptions.push({
      title: intl.formatMessage(messages.MyAnswers),
      linkURL: '/profile/private/qa/answeredbyme',
    });

    navOptions.push({
      title: intl.formatMessage(messages.QuestionsToAnswer),
      linkURL: '/profile/public/qa/allunanswered',
    });

    return navOptions;
  }

  render() {

    const { params, intl } = this.props;

    let myAskData = null;
    if (this.props) {
      if (this.props.privateProfileData) {
        if (this.props.privateProfileData.askAnAstronomerData) {
          myAskData = this.props.privateProfileData.askAnAstronomerData;
        }
      }
      else if (this.props.data) {
        myAskData = this.props.data.askAnAstronomerData;
      }
    }

    return (
      <CenterColumn>
        <ContainerWithTitle
          title={intl.formatMessage(messages.QaSectionTitle)}
          activeFilter={params.filter}
          navItems={this.getNavItems(intl, myAskData)}
          parentPath="profile/private/qa"
          showNavigation
        >

          {params.filter == "asked" &&
            <QaContainer params={params}>
              <MyQa key={`qa-tab-${params.filter}`} />
            </QaContainer>
          }

          {params.filter == "answeredbyme" && myAskData.canAnswerQuestions && <QaContainer params={params}>
              <MyQa key={`qa-tab-${params.filter}`} />
            </QaContainer>
          }

          {params.filter == "answeredbyme" && myAskData.canAnswerQuestions === false && <QaContainer params={params}>
              <p>hello1</p>
            </QaContainer>
          }

          {params.filter == "allunanswered" && myAskData.canAnswerQuestions && <QaContainer params={params}>
              <MyQa key={`qa-tab-${params.filter}`} />
            </QaContainer>
          }

          {params.filter == "allunanswered" && myAskData.canAnswerQuestions === false && <QaContainer params={params}>
              <p>hello2</p>
            </QaContainer>
          }

        </ContainerWithTitle>
      </CenterColumn>
    );
  }
}

export default injectIntl(ProfileQaContainer);
