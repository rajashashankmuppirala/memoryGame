/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/App';
import {name as appName} from './src/app.json';
import Board from './src/App/board/Board';

AppRegistry.registerComponent(appName, () => Board);
