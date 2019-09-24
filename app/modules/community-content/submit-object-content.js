import { API } from 'app/api';

export default function submitObjectContent({
  cid,
  at,
  token,
  objectSlug,
  status,
  type,
  title,
  content,
  postTags,
  S3URLs,
}) {
  return API.post('/api/content/submitObjectContent', {
    cid,
    at,
    token,
    objectSlug,
    status,
    type,
    title,
    content,
    postTags,
    S3URLs,
  });
}
