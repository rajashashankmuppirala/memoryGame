/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Board from './App/board/Board';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Board);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('memory-game'),
});
