/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/configureStore';
import RootComponent from './src/RootComponent';
const App = () => {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};
export default App;
