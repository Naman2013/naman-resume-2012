import axios from 'axios';

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
  return axios.post('/api/content/submitObjectContent', {
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
