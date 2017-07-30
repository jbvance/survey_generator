import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //will return false if not logged in because it will be an empty string ("")
    default:
      return state;
  }
}
