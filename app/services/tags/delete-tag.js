import axios from 'axios';

const deleteTag = ({
  token,
  at,
  cid,
  tagType, //  (required) user(for both)  system(for mission)  objective(for mission)
          // observation(for image) none   post (for content)
  tagClass, // (required) mission  image content  none
  scheduledMissionId, //  (required for tagClass mission or image)
  customerImageId, //  (required for tagClass of image, ignored otherwise)
  uniqueId, //  (required for tagClass content)
  text, // (required)
}) => (
  axios.post('/api/tags/deleteTag', {
    token,
    at,
    cid,
    tagType,
    tagClass,
    scheduledMissionId,
    customerImageId,
    uniqueId,
    text,
  })
);

export default deleteTag;
