import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';
import {HOST, PORT, URL} from '../../constants';
import {ADD_STREAM, MY_STREAM} from './types';

const peerServer = new Peer(undefined, {
  host: HOST,
  secure: false,
  port: PORT,
  path: '/peer',
});

peerServer.on('error', (err) => console.log({err}));

export const socket = IO(URL, {
  // path: '/peer',
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ['websocket'],
  agent: false, // [2] Please don't set this to true
  upgrade: false,
  rejectUnauthorized: false,
});

socket.on('connect', () => console.log('Connected client'));

socket.on('connect_error', (error) => {
  console.warn(error);
  // console.log('trying to reconnect');
  // socket.connect();
});

socket.on('error', (error) => {
  console.warn('Socket error ', error.message);
});

export const joinRoom = (stream) => async (dispatch) => {
  const roomID = 'asdfaswceyonry9y490489524h5';

  dispatch({type: MY_STREAM, payload: stream});

  peerServer.on('open', (userId) => {
    console.log('My peer ID is: ' + userId, socket.connected);
    socket.emit('join-room', {roomID, userId});
  });

  socket.on('user-connected', (userId) => {
    console.log('user-connected', userId);
    connectToNewUser(userId, stream, dispatch);
  });

  socket.on('call', (call) => {
    call.answer(stream);

    call.on('stream', (remoteStream) => {
      dispatch({type: ADD_STREAM, payload: remoteStream});
    });
  });
};

function connectToNewUser(userId, stream, dispatch) {
  const call = peerServer.call(userId, stream);
}
