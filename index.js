/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Routes from './src';
console.disableYellowBox = true;//retirando os avisos
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Routes);
