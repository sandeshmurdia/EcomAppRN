/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, StatusBar, StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // One-time breadcrumb to confirm app execution path in production logs.
  useEffect(() => {
    console.info('[App] mounted');
  }, []);

  // Removed an intentional crash (`b` was undefined) that triggered
  // `ReferenceError: Property 'b' doesn't exist` at runtime.
  return (
    <View style={styles.container}>
       
      <TextInput value={""} placeholder="Zipy Debug ID" editable={false} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
