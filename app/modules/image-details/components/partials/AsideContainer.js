import React from 'react';
import PropTypes from 'prop-types';
import MissionDetailList from 'app/modules/image-details/components/MissionDetailList';
import MissionImageDetailList from 'app/modules/image-details/components/MissionImageDetailList';
import ObserverInfo from 'app/modules/image-details/components/ObserverInfo';
import ObjectDetailList from 'app/modules/image-details/components/ObjectDetailList';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const AsideContainer = ({
  avatarURL,
  customerImageId,
  displayName,
  gravityRankLabel,
  isDesktop,
  objectId,
  scheduledMissionId,
  showMissionRelatedInfo,
  iconFileData,
}) => (
  <div className="aside-container">
    <div>
      <ObserverInfo
        avatarURL={avatarURL}
        isDesktop={isDesktop}
        displayName={displayName}
        gravityRankLabel={gravityRankLabel}
        observerData={iconFileData?.Member}
      />
    </div>
    {!isDesktop && objectId !== '0' ? <div>
      <ObjectDetailList
        isDesktop={isDesktop}
        objectId={objectId}
        scheduledMissionId={scheduledMissionId}
      />
    </div> : null}
    {showMissionRelatedInfo ? <div>
      <MissionDetailList
        isDesktop={isDesktop}
        scheduledMissionId={scheduledMissionId}
        customerImageId={customerImageId}
      />
    </div> : null}
    {showMissionRelatedInfo ? <div>
      <MissionImageDetailList
        isDesktop={isDesktop}
        scheduledMissionId={scheduledMissionId}
      />
    </div> : null}
  </div>
);

AsideContainer.propTypes = {
  customerImageId: string,
  displayName: string,
  fileData: shape({
    Telescope: string,
  }),
  gravityRankLabel: string,
  isDesktop: bool,
  objectId: string,
  scheduledMissionId: string,
  showMissionRelatedInfo: bool,
};

AsideContainer.defaultProps = {
  customerImageId: null,
  displayName: '',
  fileData: {
    Telescope: ''
  },
  gravityRankLabel: '',
  isDesktop: true,
  objectId: null,
  scheduledMissionId: null,
  showMissionRelatedInfo: false,
};
export default AsideContainer;
