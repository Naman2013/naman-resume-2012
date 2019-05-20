// @flow

import { deletePostImageApi } from 'app/modules/ask-astronomer/api';

export const uploadedImgCleanUp = (
  S3URLs: Array<any>,
  cid: string,
  token: string,
  at: string,
  uniqueId: string,
  imageClass: 'community' | 'discussion' | 'mypictures'
) => {
  if (S3URLs && S3URLs.length) {
    return deletePostImageApi({
      imageURL: S3URLs[0],
      cid,
      token,
      at,
      uniqueId,
      imageClass,
    });
  }
};
