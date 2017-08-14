import axios from 'axios';
import { FETCH_USER } from './types';

// If redux-thunk sees that we return a function instead of an action
// (which is usually what action creators return), redux-thunk will
// automatically call the below function and pass in dispatch action as
// an argument. We can then call dispatch whenever we want to dispatch the
// desired action to the reducers.
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Take the token from Payments component and post it
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = values => {
  return { type: 'submit_survey' };
};
