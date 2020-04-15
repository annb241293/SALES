/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Provider as ThemeProvider, DefaultTheme } from 'react-native-paper';
import store, { persistor } from './src/store/configureStore'
import { Platform, StyleSheet, Text, SafeAreaView, View, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import RootComponent from './src/RootComponent';
import { Colors } from './src/theme';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
const App = () => {

  const [bottomColor, setBottomColor] = useState(Colors.colorchinh);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.colorchinh }} />
        <SafeAreaView
          forceInset={{ top: 'never' }}
          style={{ flex: 1, backgroundColor: bottomColor }}>
          <RootComponent />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
};



export default App;
