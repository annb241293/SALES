/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/configureStore';
import RootComponent from './src/RootComponent';
import { Platform, StyleSheet, Text, SafeAreaView, View, StatusBar } from 'react-native';
import { Colors } from './src/theme';


const App = () => {

  const [bottomColor, setBottomColor] = useState(Colors.colorchinh);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.colorchinh} />
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.colorchinh }} />
      <SafeAreaView
        forceInset={{ top: 'never' }}
        style={{ flex: 1, backgroundColor: bottomColor }}>
        <RootComponent />
      </SafeAreaView>
    </Provider>
  );
};
export default App;
