import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Text, TextInput, View } from 'react-native';

if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const App = () => {
  return (
    <AppNavigator/>
  );
};

export default App;