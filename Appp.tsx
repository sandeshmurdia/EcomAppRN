/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';


function App() {
  return (
    <View style={styles.container}>
      <TextInput value="" placeholder="Zipy Debug ID" editable={false} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
