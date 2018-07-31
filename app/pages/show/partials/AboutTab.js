/***********************************
* V4 Shows About Tab
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import { romance } from 'styles/variables/colors_tiles_v4';
import GuideSection from 'components/guides/GuideSection';
import GuideBodyContent from 'components/guides/GuideBodyContent';
import like from 'services/events/like';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import styles from './MainContent.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class AboutTab extends Component {
  static propTypes = {
    content: string,
    isDesktop: bool.isRequired,
    isScreenMedium: bool.isRequired,
    showId: string.isRequired,
    likesCount: number,
    showLikePrompt: bool,
    likePrompt: string,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    content: '',
    likesCount: 0,
    showLikePrompt: false,
    likePrompt: '',
  };

  state = {

  }



  render() {
    const {
      showId,
      content,
      likesCount,
      likePrompt,
      showLikePrompt,
      isDesktop,
      isScreenMedium,
      user,
    } = this.props;

    const {

    } = this.state;
    const likeParams = {
      likeId: showId,
      likeType: 'show',
    };
    const contentFooter = () => (
      <div>
        <LikeSomethingButton
          likeHandler={like}
          likesCount={likesCount}
          likePrompt={likePrompt}
          likeParams={likeParams}
          showLikePrompt={showLikePrompt}
          user={user}
          customerId={user.cid}
        />
      </div>
    );
    return (
      <div>
        <LabeledTitleTiles
          theme={{ margin: '15px', backgroundColor: romance }}
          tiles={{
            Host: {
              text: 'Paul Cox',
              label: 'Host:',
            },
            'Watch Time': {
              text: '45 Minutes',
              label: 'Watch Time:',
            },
            Subject: {
              text: 'Constellations',
              label: 'Subject:',
            },
          }}
          direction="column"
        />
        <GuideSection
          content={() => (<GuideBodyContent title="" content={content} theme={{ backgroundColor: romance }} footer={contentFooter} />)}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AboutTab;
