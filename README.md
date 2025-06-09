# Expo Wake Word by Davoice

[![GitHub release](https://img.shields.io/github/release/frymanofer/KeyWordDetectionIOSFramework.svg)](https://github.com/frymanofer/KeyWordDetectionIOSFramework/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

By [DaVoice.io](https://davoice.io)

[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FDaVoiceAI)](https://twitter.com/DaVoiceAI)


Welcome to **Davoice "Wake Word" / Keywords Detection** – Wake words and keyword detection solution designed by **DaVoice.io**.

## About this project

This is a **"wake word"** package for **Expo** (React-Native). A wake word is a keyword that activates your device, like "Hey Siri" or "OK Google". "Wake Word" is also known as "keyword detection", "Phrase Recognition", "Phrase Spotting", “Voice triggered”, “hotword”, “trigger word”

It also provide **Speech to Intent**. **Speech to Intent** refers to the ability to recognize a spoken word or phrase
and directly associate it with a specific action or operation within an application. Unlike a **"wake word"**, which typically serves to activate or wake up the application,
Speech to Intent goes further by enabling complex interactions and functionalities based on the recognized intent behind the speech.

For example, a wake word like "Hey App" might activate the application, while Speech
to Intent could process a phrase like "Play my favorite song" or "Order a coffee" to
execute corresponding tasks within the app.
Speech to Intent is often triggered after a wake word activates the app, making it a key
component of more advanced voice-controlled applications. This layered approach allows for
seamless and intuitive voice-driven user experiences.

## Latest news

- **New 8 June 2025**:
This is the first release of **Expo wake word and voice commands** it is limited in the Expo settings and for now a few manual changes are required within the IOS and Android folders. 

- **New 2 June 2025**:
  
   Fix **IOS build failure**.

   **issue** - could not build IOS app when the Podfile was set to static linking. </br>
   **solution** - fixed in react-native-wakeword npm package version "1.1.12".

## Features

- **Easy to deploy with Expo (React-Native):** Check out our example: "rn_example/DetectingKeyWords.js". With a few simple lines of code, you have your own keyword detecting enabled app.
- **Cross-Platform Support:** Integrate Davoice KeywordsDetection into **Expo** React-Native Framework. Both iOS and Android are supported.
- **Low Latency:** Experience near-instantaneous keyword detection.
- **High Accuracy:** We have succesfully reached over 99% accurary for all our models. **Here is on of our customer's benchmarks**:
- **Real-World Benchmarks:** At DaVoice, we believe in real benchmarks done by customers on actual use cases rather than static tests. We actively encourage our customers to share their real-world experiences and results.

# <u> 🟢🟢 Customer Benchmarks 🟢🟢 </u>

## <u>Customer Benchmark **Ⅰ**:</u>
#### <u>Provided by **[Tyler Troy](https://lookdeep.health/team/tyler-troy-phd/)**, CTO & Co-Founder of **[LookDeep Health](https://lookdeep.health/)**</u>  
**[Tyler Troy](https://lookdeep.health/team/tyler-troy-phd/)** conducted an independent benchmark at **[LookDeep Health](https://lookdeep.health/)** to select a **"phrase detection"** vendor.

## **RESULTS BELOW:**

### ** 🔵 Crucial Criteria **Ⅰ** - False Positives**
- **This is THE most crucial criteria**, in hospital settings, false alerts are unacceptable—they waste valuable time and can compromise patient care.  
- **✅ DaVoice: "ZERO FALSE POSITIVES" within a month duration of testing.**  
- In contrast, Picovoice triggered several false alerts during testing, making it unsuitable for critical environments like hospitals.  
- OpenWakeWord was not tested for false positives because its true positive rate was too low.  

### **🔵 Criteria II - True Positive**

**Table 1: A comparison of model performance on custom keywords**  
```
MODEL         DETECTION RATE
===========================
DaVoice                    0.992481 ✅
Porcupine (Picovoice)      0.924812
OpenWakeWords              0.686567
```

**Read Tyler Troy, CTO & Co-Founder of LookDeep, Reddit post:**  
[Bulletproof Wakeword/Keyword Spotting](https://www.reddit.com/r/Python/comments/1ioo4yd/bulletproof_wakewordkeyword_spotting/)

### **Customer Benchmark II - customer preferred to remain anonymous**  
Benchmark on "Python wake word", vs top competitors:
- Benmark used recordings with 1326 TP files.
- Second best was on of the industry top players who detected 1160 TP 
- Third  detected TP 831 out of 1326

#### **Table 1: A comparison of model performance on custom keywords**  

```
MODEL         DETECTION RATE
===========================
DaVoice        0.992458
Top Player     0.874811
Third          0.626697
```

## Platforms and Supported Languages

- **Expo/React-Native Android:** Expo (React-Native) Wrapper for Android.
- **Expo/React-Native iOS:** Expo (React-Native) Wrapper for iOS.

# Wake word generator

## Create your "custom wake word""

In order to generate your custom wake word you will need to:

- **Create wake word mode:**
    Contact us at info@davoice.io with a list of your desired **"custom wake words"**.

    We will send you corresponding models typically your **wake word phrase .onnx** for example:

    A wake word ***"hey sky"** will correspond to **hey_sky.onnx**.

- **Add wake words to Android:**
    Simply copy the new onnx files to:

    android/app/src/main/assets/*.onnx

- **Add Wake word to IOS**
    Copy new models somewhere under ios/YourProjectName.

    You can create a folder ios/YourProjectName/models/ and copy there there.

    Now add each onnx file to xcode making sure you opt-in “copy if needed”.

- **In React/JS code add the new onnx files to your configuration**
  
    Change:

```
    // Create an array of instance configurations

    const instanceConfigs:instanceConfig[] = [
  
      { id: 'need_help_now', modelName: 'need_help_now.onnx', threshold: 0.9999, bufferCnt: 3 , sticky: false },
  
    ];
  
    To:
  
    // Create an array of instance configurations
  
    const instanceConfigs:instanceConfig[] = [
  
      { id: 'my_wake_word', modelName: 'my_wake_word.onnx', threshold: 0.9999, bufferCnt: 3 , sticky: false },
  
    ];
  
    For example if your generated custom wake word" is "hey sky":
  
    // Create an array of instance configurations
  
    const instanceConfigs:instanceConfig[] = [
  
      { id: 'hey sky', modelName: 'hey_sky.onnx', threshold: 0.9999, bufferCnt: 3 , sticky: false },
  
    ];
```

- **Last step - Rebuild your project**

## Contact

For any questions, requirements, or more support for Expo, please contact us at info@davoice.io.

## Installation and Usage

### Simply using npm install - package

npm install react-native-wakeword

**Wake word npm package From :**: https://www.npmjs.com/package/react-native-wakeword

### On Android:
Please add the following to android/build.gradle


```

allprojects {

    repositories {
    
        // react-native-wakeword added
	
	    maven { url "${project(":react-native-wakeword").projectDir}/libs" }
     
        maven { url("${project(':react-native-wakeword').projectDir}/libs") } 
	
        maven {
	
            url("${project(':react-native-wakeword').projectDir}/libs")
	    
        }
	
        // End react-native-wakeword added
	
        ... your other lines...
```

See example_npm for a specific example of using the code.

### Demo Instructions

To run the demo:

1. Clone the repository:
   ```
	git clone https://github.com/frymanofer/Expo_WakeWord
   ```
2. npm install

Run 'npm install'

## Activating Microphone while the app operates in the background or during shutdown/closure.
This example in the Git repository enables Android functionality in both the foreground and background, and iOS functionality in the foreground. However, we have developed an advanced SDK that allows the microphone to be activated from a complete shutdown state on Android and from the background state on iOS. If you require this capability for your app, please reach out to us at ofer@davoice.io.

#### Example for iOS Background State

The example below, built in Expo (React-Native), demonstrates this approach. The function backgroundMicEmptyListener() creates a minimal listener with negligible CPU impact, only processing the function call and return.

Apple restricts background microphone access for privacy and battery efficiency. However, certain applications, such as security apps, car controlling apps, apps for the blind or visually impaired may require this functionality.

Below is an example for one of the workarounds we have done in order to activate microphone with an empty listener. This approach avoids unnecessary battery usage until real audio capture is needed, at which point you can swap the placeholder listener with the actual microphone callback.

The example below, built in Expo (React-Native), demonstrates this approach. The function backgroundMicEmptyListener() creates a minimal listener with negligible CPU impact, only processing the function call and return.

```javascript
const handleAppStateChange = (nextAppState) => {
  console.log("handleAppStateChange(): ", nextAppState);
  
  if (nextAppState === 'background') {
    console.log("nextAppState === 'background'");
    BackgroundJob.start(backgroundMicEmptyListener, backgroundOptions)
      .then(() => {
        console.log('Background job started successfully');
      })
      .catch((err) => {
        console.error('Error starting background job:', err);
      });
  }
}
```

### Key words

DaVoice.io Voice commands / Wake words / Voice to Intent / keyword detection npm for Android and IOS.
"Wake word detection github"
"Wake Word" 
"keyword detection"
"Phrase Recognition"
"Phrase Spotting"
“Voice triggered”
“hotword”
“trigger word”
"Expo wake word",
"Wake word detection github",
"Wake word generator",
"Custom wake word",
"voice commands",
"wake word",
"wakeword",
"wake words",
"keyword detection",
"keyword spotting",
"speech to intent",
"voice to intent",
"phrase spotting",
"Expo (React-Native) wake word",
"Davoice.io wake word",
"Davoice wake word",
"Davoice Expo (React-Native) wake word",
"Davoice Expo wake word",
"wake",
"word",
"Voice Commands Recognition",
"lightweight Voice Commands Recognition",
"customized lightweight Voice Commands Recognition",
"rn wake word"

## Links

- **Wake word npm package:** https://www.npmjs.com/package/react-native-wakeword

Here are wakeword detection GitHub links per platform:

- **For Python:** https://github.com/frymanofer/Python_WakeWordDetection
- **Web / JS / Angular / React:** https://github.com/frymanofer/Web_WakeWordDetection/tree/main
- **For Expo (React-Native):** [Expo_WakeWord](https://github.com/frymanofer/Expo_WakeWord)
- **For React-Native:** [ReactNative_WakeWordDetection](https://github.com/frymanofer/ReactNative_WakeWordDetection)
- **For Flutter:** [https://github.com/frymanofer/Flutter_WakeWordDetection]
- **For Android:** [KeywordsDetectionAndroidLibrary](https://github.com/frymanofer/KeywordsDetectionAndroidLibrary)
- **For iOS framework:** 
  - With Expo (React-Native) bridge: [KeyWordDetectionIOSFramework](https://github.com/frymanofer/KeyWordDetectionIOSFramework)
  - Sole Framework: [KeyWordDetection](https://github.com/frymanofer/KeyWordDetection)
 
  
