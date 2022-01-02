import {MY_STREAM} from '../actions/types';

const initialState = {
  stream: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_STREAM:
      return {stream: action.payload};

    default:
      return state;
  }
};
