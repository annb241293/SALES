/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Provider as ThemeProvider, DefaultTheme } from 'react-native-paper';
import store, { persistor } from './src/store/configureStore'
import { Platform, StyleSheet, Text, SafeAreaView, View, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import RootComponent from './src/RootComponent';


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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="light-content" />
            <RootComponent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};



export default App;
