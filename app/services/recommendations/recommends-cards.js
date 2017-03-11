/**
  recommends-cards: used to fetch Slooh recommends content
  */

import axios from 'axios';

/**
  @param at: provided by user login
  @param: token: provided by user login
  @param: cid: provided by user login
  @param: objectId: Either objectId or astroObjectId
  @param: STRING: 'community' TODO: doc other others
*/
export const fetchRecommendsCards = ({ at, token, cid, objectId, type }) => {
  return axios.post('/api/recommends/cards', {
    at,
    token,
    cid,
    objectId,
    type,
  });
};
