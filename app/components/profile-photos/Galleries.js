/***********************************
* V4 Gallries 
***********************************/


import React from 'react';
import ImageList from '../../containers/profile-photos/ImageList';
import GalleryCard from './GalleryCard';

export default () => (
  <ImageList
    type="galleries"
    request="fetchGalleriesAndCounts"
  >
    <GalleryCard />
  </ImageList>
);

