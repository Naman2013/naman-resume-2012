import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DescriptionContainer from 'components/common/description-container';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import StaticCell from 'components/object-details/grid/StaticCell';
import GridContainer from 'components/object-details/grid/GridContainer';
import Row from 'components/object-details/grid/Row';
import HostLongTile from 'components/HostLongTile';
import like from 'services/community-content/like';
import { romance } from 'styles/variables/colors_tiles_v4';
import styles from '../StoryDetails.style';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const MainContainer = ({
  authorInfo,
  canLikeFlag,
  content,
  isDesktop,
  likeParams,
  likePrompt,
  likesCount,
  objectId,
  scheduledMissionId,
  showLikePrompt,
  storyDetails,
  title,
  user,
}) => {
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
    <div className="main-root">
      <DisplayAtBreakpoint
          screenSmall
        >
          <LabeledTitleTiles
            theme={{ backgroundColor: romance }}
            tiles={storyDetails}
            direction="column"
          />
      </DisplayAtBreakpoint>
      {storyDetails.length > 0 ? <DisplayAtBreakpoint
        screenMedium
        >
          <GridContainer theme={{ marginTop: '25px' }}>
            <Row>
              <StaticCell
                title={storyDetails[0].label}
                flexScale={['100%']}
              >
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
            <StaticCell
              title={storyDetails[2].label}
              flexScale={['50%']}
            >
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
      </DisplayAtBreakpoint> : null}
      <div className="shadowed">
        <DescriptionContainer
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
