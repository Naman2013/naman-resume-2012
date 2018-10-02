import React from 'react';
import PropTypes from 'prop-types';
import DescriptionContainer from 'components/common/description-container';
import ObjectDetailList from 'components/common/ObjectDetailList';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import GenericButton from 'components/common/style/buttons/Button';
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
  canLikeFlag,
  content,
  isDesktop,
  likeParams,
  likePrompt,
  likesCount,
  objectId,
  scheduledMissionId,
  showLikePrompt,
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
    <div>
      {!isDesktop && objectId !== '0' ?
        <div>
          <ObjectDetailList
            isDesktop={isDesktop}
            objectId={objectId}
            scheduledMissionId={scheduledMissionId}
          />
        </div> :
      null}
      <div className="shadowed">
        <DescriptionContainer
          content={content}
          theme={{ backgroundColor: romance }}
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
