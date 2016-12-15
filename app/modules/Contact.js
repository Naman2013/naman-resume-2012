import {SubmissionError} from 'redux-form';
import axios from 'axios';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const SEND_MESSAGE = 'SEND_MESSAGE';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const send = createAction(SEND_MESSAGE);
export const success = createAction(SEND_MESSAGE_SUCCESS);
export const fail = createAction(SEND_MESSAGE_FAILURE);

export const contact = (contactFormValues) => (dispatch) => {
    const {firstname, lastname, email, message} = contactFormValues;

    dispatch(send());

    return axios.post('/api/users/contact', {
        firstname,
        lastname,
        email,
        message,
    })
        .then(() => {
            dispatch(success());
        })
        .catch(() => {
            dispatch(fail());
            throw new SubmissionError({_error: 'Your message in was unsuccessful. Please try again.'});
        });
};


const initialState = {
    isSent: false,
};

export default createReducer(initialState, {
    [SEND_MESSAGE](state) {
        return {
            ...state,
            isSent: false,
        };
    },
    [SEND_MESSAGE_SUCCESS](state) {
        return {
            ...state,
            isSent: true,
        };
    },
    [SEND_MESSAGE_FAILURE](state) {
        return {
            ...state,
            isSent: false,
        };
    },
});
