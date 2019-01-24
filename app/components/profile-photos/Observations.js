/***********************************
* V4 Observations 
***********************************/


import React from 'react';
import ImageList from '../../containers/profile-photos/ImageList';
import MissionCard from './MissionCard';

export default function Missions() {
  return (
    <ImageList
      type="observation"
      request="fetchMissionsAndCounts"
    >
      <MissionCard />
    </ImageList>
  );
}
