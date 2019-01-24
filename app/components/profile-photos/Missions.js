/***********************************
* V4 Missions 
***********************************/


import React from 'react';
import ImageList from '../../containers/profile-photos/ImageList';
import MissionCard from './MissionCard';

export default function Missions() {
  return (
    <ImageList
      type="missions"
      request="fetchMissionsAndCounts"
    >
      <MissionCard />
    </ImageList>
  );
}
