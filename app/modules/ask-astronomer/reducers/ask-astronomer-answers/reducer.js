import cloneDeep from 'lodash/cloneDeep';
import take from 'lodash/take';
import createReducer from '../../../utils/createReducer';
import {
  FETCH_ASTRONOMER_ANSWERS_FAIL,
  FETCH_ASTRONOMER_ANSWERS_START,
  FETCH_ASTRONOMER_ANSWERS_SUCCESS,
  SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_FAIL,
  SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_START,
  SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_SUCCESS,
  TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS,
  UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST,
} from './actions';

import {
  REPLY_TO_ASTRONOMER_ANSWER_SUCCESS,
  // TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES,
} from '../ask-astronomer-answer-discuss/actions';

const PAGE_COUNT = 5;

const initialState = {
  fetching: false,
  answers: [],
  visible: PAGE_COUNT,
};

export default createReducer(initialState, {
  'AAA/LOAD_MORE_ANSWERS': state => {
    return {
      ...state,
      visible: state.visible + PAGE_COUNT,
    };
  },

  [FETCH_ASTRONOMER_ANSWERS_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_SUCCESS](state, { payload }) {
    const { replies = [] } = payload;

    return {
      ...state,
      answers: replies,
      fetching: false,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
    };
  },

  // todo remove
  [TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS](state, { payload }) {
    const { threadId } = payload;
    const newAllAnswers = cloneDeep(state.allAnswers);

    if (newAllAnswers[threadId]) {
      newAllAnswers[threadId].showAllAnswers = payload.showAllAnswers;
    }
    return {
      ...state,
      allAnswers: newAllAnswers,
    };
  },
  // PAGE HANDLE
  // todo remove
  [UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST](state, { payload }) {
    const { page, threadId, displayedAnswers } = payload;
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedAnswers);
    const newAllState = cloneDeep(state.allAnswers);
    if (newAllState[threadId]) {
      newAllState[threadId].page = page || 1;

      const toAnswer = newAllState[threadId].page * state.paginationCount;
      newAllDisplayedAnswers[threadId] = newAllState[threadId].replies.map(
        (item, index) => {
          // if (toAnswer - state.paginationCount <= index && index < toAnswer) {
          if (index < toAnswer) {
            return item.replyId;
          }
        }
      );
    }

    return {
      ...state,
      page,
      allAnswers: newAllState,
      allDisplayedAnswers: newAllDisplayedAnswers,
    };
  },
  // todo NOT USED
 /* [REPLY_TO_ASTRONOMER_ANSWER_SUCCESS](state, { payload }) {
    const { threadId, replyTo } = payload;

    const newAllState = cloneDeep(state.allAnswers);

    if (newAllState[threadId] && newAllState[threadId].replies) {
      newAllState[threadId].replies = newAllState[threadId].replies.map(
        answer => {
          if (answer.replyId === replyTo) {
            answer.replyToponlyCount += 1;
          }
          return answer;
        }
      );
    }

    return {
      ...state,
      allAnswers: newAllState,
    };
  },*/
  [SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_START](state, { payload }) {
    const { threadId } = payload;
    const newAnswerSubmissions = cloneDeep(state.allAnswerSubmissions);
    newAnswerSubmissions[threadId] = {
      submitting: true,
      submitted: false,
    };
    return {
      ...state,
      fetching: true,
      allAnswerSubmissions: newAnswerSubmissions,
    };
  },
  [SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_SUCCESS](state, { payload }) {
    const { threadId, reply } = payload;
    const { paginationCount } = state;
    // first change the submission model
    const newAnswerSubmissions = cloneDeep(state.allAnswerSubmissions);
    newAnswerSubmissions[threadId] = {
      submitting: false,
      submitted: true,
    };

    const newAllAnswers = cloneDeep(state.allAnswers);
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedAnswers);
    if (newAllAnswers[threadId] && newAllAnswers[threadId].replies) {
      // then add the new submission to the list of answers
      newAllAnswers[threadId].replies = [].concat(
        newAllAnswers[threadId].replies,
        reply
      );
      // add the new submission to the displayedAnswers array
      // but only add it if the last page is the currently displayed page.
      if (newAllAnswers[threadId].showAllAnswers) {
        const lastPage =
          Math.ceil(newAllAnswers[threadId].replies.length / paginationCount) ||
          1;

        if (newAllAnswers[threadId].page === lastPage) {
          newAllDisplayedAnswers[threadId] =
            newAllDisplayedAnswers[threadId] || [];
          newAllDisplayedAnswers[threadId] = [].concat(
            newAllDisplayedAnswers[threadId],
            reply.replyId
          );
        }
      } else {
        // make sure we always open the answers when an answer is submitted
        newAllAnswers[threadId].showAllAnswers = true;
        // show first X answers
        newAllDisplayedAnswers[threadId] = take(
          newAllAnswers[threadId].replies,
          paginationCount
        ).map(rep => rep.replyId);
      }
    } else {
      newAllAnswers[threadId] = {
        replies: [reply],
        showAllAnswers: true,
      };

      newAllDisplayedAnswers[threadId] = [reply.replyId];
    }

    return {
      ...state,
      allAnswers: newAllAnswers,
      allAnswerSubmissions: newAnswerSubmissions,
      allDisplayedAnswers: newAllDisplayedAnswers,
      // submitToThreadId: threadId,
      fetching: false,
    };
  },
  [SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_FAIL](state, { payload }) {
    const { threadId } = payload;
    const newAnswerSubmissions = cloneDeep(state.allAnswerSubmissions);
    newAnswerSubmissions[threadId] = {
      submitting: false,
      submitted: true,
    };
    return {
      ...state,
      fetching: false,
      allAnswerSubmissions: newAnswerSubmissions,
    };
  },
});
