import axios from 'axios';

export default function fetchSharedMemberPhotosService({
  token,
  at,
  cid,
  objectId,
  pagingMode,
  count,
  page,
  v4Filter,
}) {
  return axios.post('/api/images/getSharedMemberPictures', {
    token,
    at,
    cid,
    objectId,
    pagingMode,
    count,
    page,
    v4Filter,
  });
}
