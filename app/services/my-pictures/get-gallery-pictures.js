import axios from 'axios';

export const getGalleryPictures = ({
  at,
  cid,
  token,
  galleryId,
  pagingMode,
  timeFilter,
  tagFilters,
  dateFilter,
  filterType,
  maxImageCount,
  firstImageNumber,
}) => (
  axios.post('/api/images/getGalleryPictures', {
    at,
    cid,
    token,
    galleryId,
    pagingMode,
    timeFilter,
    tagFilters,
    dateFilter,
    filterType,
    maxImageCount,
    firstImageNumber,
  })
);
