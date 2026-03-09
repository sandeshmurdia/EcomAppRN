/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './Appp';
import { name as appName } from './app.json';
import zipy, { withGestureCapture } from 'zipy-react-native';
console.log('izpt  dasdasdasd ');






zipy.init("5a83c383");


AppRegistry.registerComponent(appName, () => withGestureCapture(App));
