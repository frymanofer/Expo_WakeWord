/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RNFS from 'react-native-fs';

import React, { useEffect, useState } from 'react';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';
import { useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { Audio } from 'expo-av';

const requestMicrophonePermission = async () => {
  const { status } = await Audio.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Microphone permission not granted');
  } else {
    console.log('Microphone permission granted');
  }
};


import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LinearGradient from 'react-native-linear-gradient';

// Two wakes to use react-native-wakeword via hooks
// suitable for react users.
// React - Use this for hooks:
// import useModel from 'react-native-wakeword';

//  or direct for simple js.
// Direct with JS:
// import KeyWordRNBridge from 'react-native-wakeword'; 
import { KeyWordRNBridgeInstance } from 'react-native-wakeword'; 
import removeAllRNBridgeListeners from 'react-native-wakeword'; 
import { createKeyWordRNBridgeInstance } from 'react-native-wakeword'; 

var calledOnce = false;

interface instanceConfig {
  id: string;
  modelName: string;
  threshold: number;
  bufferCnt: number;
  sticky: boolean;
}
  // Create an array of instance configurations
  const instanceConfigs:instanceConfig[] = [
    { id: 'hey_lookdeep', modelName: 'hey_lookdeep.onnx', threshold: 0.9999, bufferCnt: 3 , sticky: false },
  ];

//import RNFS from 'react-native-fs';

import { NativeModules } from 'react-native';
import { AppState } from 'react-native';


// Helper function to format the ONNX file name
const formatWakeWord = (fileName) => {
  return fileName
    .replace(/_/g, ' ')  // Use global flag to replace all underscores
    .replace('.onnx', '')
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const AudioPermissionComponent = async () => {
  const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;
  await request(permission);
  const status = await check(permission);
  if (status !== RESULTS.GRANTED) {
      await request(permission);
  }
  if (Platform.OS === 'ios' )
  {

  }
  else {
    // Bug FOREGROUND_SERVICE does not exist
    const foregroundServicePermission = await request('android.permission.FOREGROUND_SERVICE');
    if (foregroundServicePermission === RESULTS.GRANTED) {
      console.log("Permissions granted", "Microphone and foreground service permissions granted.");
        // Start your service or perform other actions
    } else {
      console.log("Permission denied", "Foreground service microphone permission is required.");
    }
  }
}

type DetectionCallback = (event: any) => void;

  
// Function to add a new instance dynamically
//async function addInstance(conf: instanceConfig) 
async function addInstance(
  conf: instanceConfig): Promise<KeyWordRNBridgeInstance> {
  const id = conf.id;
  const instance = await createKeyWordRNBridgeInstance(id, false);

  if (!instance) {
      console.error(`Failed to create instance ${id}`);
  }
  console.log(`Instance ${id} created ${instance}`);
  await instance.createInstance(conf.modelName, conf.threshold, conf.bufferCnt);
  console.log(`Instance ${id} createInstance() called`);
  return instance;
}

async function set_callback(instance: KeyWordRNBridgeInstance, callback: (phrase: string) => void) { 
  const eventListener = instance.onKeywordDetectionEvent((phrase: string) => {
    phrase = formatWakeWord(instance.instanceId);
    console.log(`Instance ${instance.instanceId} detected: ${instance.instanceId} with phrase`, phrase);
    // callback(phrase); Does not work on IOS
    callback(phrase);
  });
  console.log("eventListener == ", eventListener);
  return eventListener;
}

// Function to remove the event listener
function removeEventListener(eventListener: any) {
  if (eventListener && typeof eventListener.remove === 'function') {
    eventListener.remove();
  }
  else {
    console.error("event listener.remove does not exist!!!!");
  }
}

const startSpeechRecognition = async () => {
  const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
  if (!result.granted) {
    console.warn("Permissions not granted", result);
    return;
  }
  // Start speech recognition
  ExpoSpeechRecognitionModule.start({
    lang: "en-US",
    interimResults: true,
    continuous: false,
  });
};


export default function App() {
  const isDarkMode = true;
  const wakeWordFile = instanceConfigs[0].modelName;
  const wakeWord = formatWakeWord(wakeWordFile);
// If you use useModel
//  console.log("useModel == ", useModel)
//  const { stopListening, startListening, loadModel, setKeywordDetectionLicense} = useModel();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false); // Track permission status
  // State to handle the display message
  const [message, setMessage] = useState(`Listening to WakeWord '${wakeWord}'...`);
  const [transcriptionMessage, setTranscriptionMessage] = useState('');

  let myInstance: KeyWordRNBridgeInstance;
  let eventListener: any;
  console.log("App.tsx");
  console.log("App.tsx");
  console.log("App.tsx");
  useSpeechRecognitionEvent('result', (event) => {
    if (event.results) {
      console.log('Speech recognized:', event.results);
      setTranscriptionMessage(event.results[0]?.transcript || '');
    }
  });
  
  useSpeechRecognitionEvent('error', (event) => {
    console.error('Speech recognition error:', event.error);
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'active') {
        try {
          console.log("Requesting Audio permission");
          // await AudioPermissionComponent();
          await requestMicrophonePermission()
          setIsPermissionGranted(true);
        } catch (error) {
          console.error("Error requesting permissions:", error);
        }
      }
    };
  
    const eventListener = AppState.addEventListener("change", handleAppStateChange);
  
    // If the app is *already* active on mount:
    if (AppState.currentState === 'active') {
      handleAppStateChange('active');
    }
  
    return () => {
      eventListener.remove();
    };
  }, []);

  useEffect(() => {
    
    const keywordCallback = async (keywordIndex: any) => {
      // Stop detection
      
      //await myInstance.stopKeywordDetection();
      // remove the listener and callback
      removeEventListener(eventListener);

      try {    
        ExpoSpeechRecognitionModule.start({
          lang: 'en-US',
          iosCategory: {
            category: 'playAndRecord',
            categoryOptions: ['duckOthers', 'defaultToSpeaker'],
            mode: 'voiceChat',
          },
          interimResults: true,
          continuous: true,
          androidIntent: 'android.speech.action.RECOGNIZE_SPEECH',
        });
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    
      console.log ("detected keyword: ", keywordIndex);
      setMessage(`WakeWord '${keywordIndex}' DETECTED`);

      const timeout = setTimeout(async () => {
        console.log('5 seconds have passed!');
        setMessage(`Listening to WakeWord '${wakeWord}'...`);
        // Perform your action here
        // Stop detection
        eventListener = await set_callback(myInstance, keywordCallback);
        await myInstance.startKeywordDetection(instanceConfigs[0].threshold);
        // remove the listener and callback
      }, 5000);
    }

    const initializeKeywordDetection = async () => {
      try {        
        try {
          console.log('Adding element:', instanceConfigs[0]);
          myInstance = await addInstance(instanceConfigs[0]);
        } catch (error) {
            console.error("Error loading model:", error);
            return;
        }
        eventListener = await set_callback(myInstance, keywordCallback);
        const isLicensed = await myInstance.setKeywordDetectionLicense(
          "MTc0OTkzNDgwMDAwMA==-QOkSZvHDA+qRiN/vX2Kp2xt30+hro4jze3dzJJAeEMc=");
        await myInstance.startKeywordDetection(instanceConfigs[0].threshold);
        if (!isLicensed) {
          console.error("No License!!! - setKeywordDetectionLicense returned", isLicensed);
        }
        /* Using use_model.tsx:
        await setKeywordDetectionLicense(
          "MTczNDIxMzYwMDAwMA==-tNV5HJ3NTRQCs5IpOe0imza+2PgPCJLRdzBJmMoJvok=");
          
        await loadModel(instanceConfigs, keywordCallback);
  */
          
      } catch (error) {
        console.error('Error during keyword detection initialization:', error);
      }
    };

    if (!calledOnce) {
      calledOnce = true;
      console.log("Calling initializeKeywordDetection();");
      initializeKeywordDetection();
      console.log("After calling AudioPermissionComponent();");
    }

    // Call your native bridge function
  //KeyWordRNBridge.initKeywordDetection("bla", 0.9999, 2);
  //loadModel();
}, [isPermissionGranted]);  // Empty dependency array ensures it runs once when the component mounts


return (
  <LinearGradient
    colors={isDarkMode ? ['#232526', '#414345'] : ['#e0eafc', '#cfdef3']}
    style={styles.linearGradient}>
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor={backgroundStyle.backgroundColor}
    />
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View 
      style={[styles.container, 
      { backgroundColor: 
        (isDarkMode ? '#ff4d4d' : '#ffcccc')}]}>
        <Text style={styles.title}>{message}</Text>
        <Text style={styles.transcription}>{transcriptionMessage}</Text>

      </View>
    </ScrollView>
    </LinearGradient>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
  marginTop: 32,
},
linearGradient: {
  flex: 1,
},
title: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#4a4a4a',
  textAlign: 'center',
  paddingHorizontal: 20,
  backgroundColor: '#ffffff99',
  borderRadius: 12,
  paddingVertical: 20,
  marginHorizontal: 10,
  elevation: 4, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
transcription: {
  fontSize: 20,
  color: '#fff',
  textAlign: 'center',
  paddingHorizontal: 16,
  marginTop: 20,
},
});

