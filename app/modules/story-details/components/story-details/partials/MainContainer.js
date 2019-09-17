import DescriptionContainer from 'app/components/common/description-container';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import LabeledTitleTiles from 'app/components/common/style/LabeledTitleTiles';
import HostLongTile from 'app/components/HostLongTile';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import PropTypes from 'prop-types';
import React from 'react';
import {
  GridContainer,
  Row,
  StaticCell,
} from '../../../../../components/common/grid';
import styles from '../StoryDetails.style';

const { arrayOf, bool, number, oneOfType, shape, string } = PropTypes;

const MainContainer = ({
  authorInfo,
  canLikeFlag,
  content,
  isDesktop,
  likeParams,
  likePrompt,
  likesCount,
  likedByMe,
  objectId,
  scheduledMissionId,
  showLikePrompt,
  storyDetails,
  title,
  user,
  likeStory,
}) => {
  const contentFooter = () => (
    <div>
      <LikeSomethingButton
        likeHandler={likeStory}
        likesCount={likesCount}
        likedByMe={likedByMe}
        likePrompt={likePrompt}
        likeParams={likeParams}
        showLikePrompt={showLikePrompt}
        customerId={user.cid}
      />
    </div>
  );
  return (
    <div className="main-root">
      <DisplayAtBreakpoint screenSmall>
        <LabeledTitleTiles
          theme={{ backgroundColor: romance }}
          tiles={storyDetails}
          direction="column"
        />
      </DisplayAtBreakpoint>
      {storyDetails.length > 0 ? (
        <DisplayAtBreakpoint screenMedium>
          <GridContainer theme={{ marginTop: '25px' }}>
            <Row>
              <StaticCell title={storyDetails[0].label} flexScale={['100%']}>
                <p>{storyDetails[0].text}</p>
              </StaticCell>
            </Row>
            <Row>
              <StaticCell
                title={storyDetails[1].label}
                flexScale={['50%']}
                hasBorderScale={[false, true, false]}
              >
                <p>{storyDetails[1].text}</p>
              </StaticCell>
              <StaticCell title={storyDetails[2].label} flexScale={['50%']}>
                <p>{storyDetails[2].text}</p>
              </StaticCell>
            </Row>
            <Row>
              <StaticCell flexScale={['100%']}>
                <HostLongTile
                  hostGravity={authorInfo.gravity}
                  hostName={authorInfo.displayName}
                  hostPhotoURL={authorInfo.iconUrl}
                  hostTitle={authorInfo.gravityLabel}
                  hostURL={authorInfo.linkUrl}
                  isDesktop={isDesktop}
                  title={authorInfo.label}
                />
              </StaticCell>
            </Row>
          </GridContainer>
        </DisplayAtBreakpoint>
      ) : null}
      {storyDetails.length > 0 ? (
        <DisplayAtBreakpoint screenMedium>
          <GridContainer theme={{ marginTop: '25px' }}>
            <Row>
              <StaticCell title={storyDetails[0].label} flexScale={['100%']}>
                <p>{storyDetails[0].text}</p>
              </StaticCell>
            </Row>
            <Row>
              <StaticCell
                title={storyDetails[1].label}
                flexScale={['50%']}
                hasBorderScale={[false, true, false]}
              >
                <p>{storyDetails[1].text}</p>
              </StaticCell>
              <StaticCell title={storyDetails[2].label} flexScale={['50%']}>
                <p>{storyDetails[2].text}</p>
              </StaticCell>
            </Row>
            <Row>
              <StaticCell flexScale={['100%']}>
                <HostLongTile
                  hostGravity={authorInfo.gravity}
                  hostName={authorInfo.displayName}
                  hostPhotoURL={authorInfo.iconUrl}
                  hostTitle={authorInfo.gravityLabel}
                  hostURL={authorInfo.linkUrl}
                  isDesktop={isDesktop}
                  title={authorInfo.label}
                />
              </StaticCell>
            </Row>
          </GridContainer>
        </DisplayAtBreakpoint>
      ) : null}
      <div className="shadowed">
        <DescriptionContainer
          title={title}
          content={content}
          theme={{ backgroundColor: romance, 'margin-top': '25px' }}
          footer={contentFooter}
        />
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

MainContainer.propTypes = {
  isDesktop: bool,
  canLikeFlag: bool,
  likePrompt: string,
  likesCount: number,
  scheduledMissionId: string,
  user: shape({
    at: oneOfType([number, string]).isRequired,
    token: oneOfType([number, string]).isRequired,
    cid: oneOfType([number, string]).isRequired,
  }),
};

MainContainer.defaultProps = {
  isDesktop: true,
  canLikeFlag: true,
  likesCount: 0,
  likePrompt: '',
  scheduledMissionId: null,
  user: {},
};

export default MainContainer;
