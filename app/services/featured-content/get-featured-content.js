import axios from 'axios';

/**
  @param featuredType    (required)   myPictures, featuredObjects, popularPosts, moreAbout

  @param slugLookupId   (required for featuredType of 'moreAbout', ignored otherwise) slugLookupId of
  the object/category for which to retrieve additional content

  @param ignorePostId  (required for featuredType of 'moreAbout', ignored otherwise) PostId of the
  currently viewed post (to avoid including it in the ‘more about’ post list)

  @param status (optional)  published, draft, all - default is ‘published’

  @param startTimestamp (optional)  if not supplied, default to current time
  */

export const getFeaturedContent = ({
  featuredType,
  slugLookupId,
  ignorePostId,
  status,
  startTimestamp,
}) => (
  axios.post('/api/content/getFeaturedContent', {
    featuredType,
    slugLookupId,
    ignorePostId,
    status,
    startTimestamp,
  })
);
