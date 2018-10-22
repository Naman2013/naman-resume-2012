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
import DescriptionContainer from 'components/common/description-container';
import like from 'services/events/like';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import styles from './AboutTab.style';

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
    showInfoTileDirection: string,
    showInfoTiles: shape({
      list: shape({})
    }),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    showInfoTiles: {},
    showInfoTileDirection: 'column',
    content: '',
    likesCount: 0,
    showLikePrompt: false,
    likePrompt: '',
  };

  state = {

  }



  render() {
    const {
      content,
      isDesktop,
      isScreenMedium,
      likePrompt,
      likesCount,
      showId,
      showInfoTiles,
      showInfoTileDirection,
      showLikePrompt,
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
      <div className="root">
        <LabeledTitleTiles
          theme={{ margin: isDesktop ? 0 : '15px', backgroundColor: romance, height: 'auto' }}
          tiles={showInfoTiles.list}
          direction={showInfoTileDirection}
        />
        <DescriptionContainer title="" content={content} theme={{ backgroundColor: romance }} footer={contentFooter} />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AboutTab;
