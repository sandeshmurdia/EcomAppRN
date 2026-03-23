/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

function App() {
  // Keep this file minimal and lint-clean; it is not part of the primary app entry (`App.tsx`)
  // but exists in the repo and is checked by eslint.
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
