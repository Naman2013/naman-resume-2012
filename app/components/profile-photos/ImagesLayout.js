/***********************************
* V4 ImageLayout 
***********************************/


import React from 'react';
import { withRouter } from 'react-router';
import ImageList from '../../containers/profile-photos/ImageList';
import GalleryCard from './GalleryCard';
import MissionCard from './MissionCard';
import ObservationCard from './ObservationCard';
import PhotoRollCard from './PhotoRollCard';

const chooseCard = (type) => {
  switch (type) {
    case 'galleries': return <GalleryCard />;
    case 'observations': return <ObservationCard />;
    case 'photoroll': return <PhotoRollCard />;
    case 'missions': return <MissionCard />;
  }
}

export default withRouter(({ location }) => {
  const type = location.pathname.split('/')[4];
  return (
    <ImageList type={type}>
      {chooseCard(type)}
    </ImageList>
  );
});

