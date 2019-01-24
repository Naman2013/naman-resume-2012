/***********************************
* V4 Gallries 
***********************************/


import React from 'react';
import ImageList from './ImageList';
import GalleryCard from '../../components/profile-photos/GalleryCard';

export default () => (
  <ImageList
    type="galleries"
    request="fetchGalleriesAndCounts"
  >
    <GalleryCard />
  </ImageList>
);

