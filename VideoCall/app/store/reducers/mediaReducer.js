import {
  ADD_PEER_ID,
  ADD_REMOTE_STREAM,
  ADD_STREAM,
  MY_STREAM,
} from '../actions/types';

const initialState = {
  stream: null,
  streams: [],
  remoteStreams: [],
  peers: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_STREAM:
      return {...state, stream: action.payload};
    case ADD_STREAM:
      console.log('ADD_STREAM', action.payload);
      return {...state, streams: [action.payload, ...state.streams]};
    case ADD_REMOTE_STREAM:
      console.log('ADD_REMOTE_STREAM', action.payload);
      return {
        ...state,
        remoteStreams: [action.payload, ...state.remoteStreams],
      };
    case ADD_PEER_ID:
      const {userId, call} = action.payload;
      return {...state, peers: (state.peers[userId] = call)};

    default:
      return state;
  }
};
