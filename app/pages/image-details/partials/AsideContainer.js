import React from 'react';
import PropTypes from 'prop-types';
import MissionDetailList from 'components/common/MissionDetailList';
import MissionImageDetailList from 'components/common/MissionImageDetailList';
import UpcomingMissionAside from 'components/common/UpcomingMissionAside';
import ObserverInfo from 'components/ObserverInfo';
import ObjectDetailList from 'components/common/ObjectDetailList';

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
  domeId,
  fileData,
  gravityRankLabel,
  isDesktop,
  objectId,
  obsId,
  scheduledMissionId,
  showMissionRelatedInfo,
}) => (
  <div>
    <div>
      <ObserverInfo
        avatarURL={avatarURL}
        isDesktop={isDesktop}
        displayName={displayName}
        gravityRankLabel={gravityRankLabel}
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
    <div>
      <UpcomingMissionAside
        telescope={fileData.Telescope}
        title="Upcoming Mission"
        isDesktop={isDesktop}
        obsId={obsId}
        domeId={domeId}
      />
    </div>
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
