/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import zipy, { withGestureCapture } from 'zipyai-react-native';
console.log('izpt  dasdasdasd ');






zipy.init("115c7f9b");


AppRegistry.registerComponent(appName, () => withGestureCapture(App));
