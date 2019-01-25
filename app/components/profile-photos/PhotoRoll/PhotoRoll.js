/***********************************
* V4 PhotoRoll 
***********************************/


import React from 'react';
import ImageList from '../../../containers/profile-photos/ImageList';
import PhotoRollCard from './PhotoRollCard';

export default () => (
  <ImageList
    type="photoRoll"
  >
    <PhotoRollCard />
  </ImageList>
);
