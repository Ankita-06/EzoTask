import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Text, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { auth } from '../config/firebase';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupPress = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log('Signup successful', userCredential.user.email);
      navigation.navigate('UserList');
    } catch (error) {
      console.error('Signup error', error);

      let message = 'Something went wrong. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is not valid.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }

      Alert.alert('Signup Failed', message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.title}>Ezo Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'center', color: '#383184' },
  input: {
    height: 50, backgroundColor: '#fff', borderRadius: 8,
    paddingHorizontal: 16, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: '#ccc'
  },
  button: { backgroundColor: '#383184', paddingVertical: 14, borderRadius: 8, marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  linkText: { textAlign: 'center', color: '#383184', fontSize: 16 }
});

export default SignupScreen;
