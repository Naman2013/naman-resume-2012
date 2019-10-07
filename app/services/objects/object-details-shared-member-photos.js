import { API } from 'app/api';

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
  return API.post('/api/images/getSharedMemberPictures', {
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
