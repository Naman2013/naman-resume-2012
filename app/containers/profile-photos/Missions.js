/***********************************
* V4 Missions 
***********************************/


import React from 'react';
import ImageList from './ImageList';
import MissionCard from 'components/profile-photos/MissionCard';

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
