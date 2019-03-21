/***********************************
* V4 PhotoRoll 
***********************************/


import React from 'react';
import ImageList from '../../containers/ImageList';
import PhotoRollCard from './PhotoRollCard';

export default () => (
  <ImageList
    type="photoroll"
  >
    <PhotoRollCard />
  </ImageList>
);
