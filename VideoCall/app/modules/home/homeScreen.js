/**
 * video-call
 * homeScreen.js
 * created: 01/01/2022
 * Fuad Mohd. Firoz
 *
 * @format
 */

import type {Node} from 'react';
import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View, ScrollView} from 'react-native';
import {mediaDevices, RTCView} from 'react-native-webrtc';
import {useDispatch, useSelector} from 'react-redux';
import {joinRoom} from '../../store/actions/mediaActions';

function webRTC(dispatch) {
  let isFront = true;
  mediaDevices.enumerateDevices().then((sourceInfos) => {
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }
    mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 640,
          height: 480,
          frameRate: 30,
          facingMode: isFront ? 'user' : 'environment',
          deviceId: videoSourceId,
        },
      })
      .then((stream) => {
        dispatch(joinRoom(stream));
      })
      .catch((error) => {
        // Log error
      });
  });
}

const HomeScreen: () => Node = () => {
  const dispatch = useDispatch();
  const mediaStream = useSelector((state) => state.media?.stream);
  const mediaStreams = useSelector((state) => state.media?.streams);

  useEffect(() => {
    webRTC(dispatch);
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <View style={styles.stage}>
        {mediaStream ? (
          <RTCView streamURL={mediaStream.toURL()} style={styles.screen} />
        ) : (
          <View style={styles.noScreen} />
        )}
      </View>
      <ScrollView horizontal style={styles.streams}>
        {mediaStreams?.map((stream, index) => (
          <RTCView
            key={`stream.id:${index}`}
            streamURL={stream.toURL()}
            style={styles.stream}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stage: {
    flex: 1,
    borderWidth: 5,
    borderColor: '#0FF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  noScreen: {
    flex: 1,
    backgroundColor: '#228',
  },
  streams: {
    flex: 1,
    borderWidth: 5,
    borderColor: '#F55',
  },
  stream: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: 'green',
  },
});

export default HomeScreen;
