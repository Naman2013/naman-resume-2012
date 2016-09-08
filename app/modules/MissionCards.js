import superagent from '../utils/superagent';
import createReducer from './utils/createReducer';
import creatAction from './utils/creatAction';

const GET_ALL_MISSIONS = 'GET_ALL_MISSIONS';

const initialState = {
  missionCards: {},
};

export default createReducer(initialState, {
  [GET_ALL_MISSIONS](state) {
    return {
      ...state,
      missionCards: {is: true},
    };
  }
});

export const getAllCards = creatAction(GET_ALL_MISSIONS, 'index');

export async function login(values, dispatch) {
  const { body, body: { error } } = await superagent
    .post('https://saturn.slooh.com:444/recommends/cards')
    .type('form')
    .send({
      'status': 'published',
      'ver': 'v1',
      'lang': 'en',
      'type': 'curated'
    });

  console.log(error);
}
