import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';
import {HOST, PORT, URL} from '../../constants';
import {MY_STREAM} from './types';

export const socket = IO(URL, {
  forceNew: true,
});

socket.on('connection', () => console.log('Connected client'));

// const peerServer = new Peer(undefined, {
//   host: HOST,
//   secure: false,
//   port: PORT,
//   path: '/peer',
// });

// peerServer.on('error', (err) => console.log({err}));

export const joinRoom = (stream) => async (dispatch) => {
  const roomID = 'asdfaswceyonry9y490489524h5';

  dispatch({type: MY_STREAM, payload: stream});
};

function connectToNewUser() {}
