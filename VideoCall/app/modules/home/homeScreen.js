/**
 * video-call
 * homeScreen.js
 * created: 01/01/2022
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {mediaDevices} from 'react-native-webrtc';

function webRTC() {
  let isFront = true;
  mediaDevices.enumerateDevices().then(sourceInfos => {
    console.log(sourceInfos);
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
      .then(stream => {
        // Got stream!
        console.log(stream);
      })
      .catch(error => {
        // Log error
      });
  });
}

const HomeScreen: () => Node = () => {
  useEffect(() => {
    webRTC();
  }, []);

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
