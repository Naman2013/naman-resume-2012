/***********************************
* V4 ImageLayout 
***********************************/


import React from 'react';

import { DeviceContext } from '../../providers/DeviceProvider';

import ImageList from '../../containers/profile-photos/ImageList';
import GalleryCard from './Galleries/GalleryCard';
import MissionCard from './Missions/MissionCard';
import ObservationCard from './Observations/ObservationCard';
import PhotoRollCard from './PhotoRoll/PhotoRollCard';

const chooseCard = (type) => {
  switch (type) {
    case 'galleries': return <GalleryCard />;
    case 'observations': return <ObservationCard />;
    case 'photoroll': return <PhotoRollCard />;
    case 'missions': return <MissionCard />;
  }
}

export default ({ currentTab: type }) => {
  return (
    <DeviceContext.Consumer>
      {context => (
        <ImageList type={type} deviceInfo={context}>
          {chooseCard(type)}
        </ImageList>
      )}
    </DeviceContext.Consumer>
  );
};

