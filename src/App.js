/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Board from './App/board/Board';
import {View} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <View>
        <Board />
      </View>
    </>
  );
};

export default App;
