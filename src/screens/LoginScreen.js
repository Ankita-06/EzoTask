import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Text, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { auth } from '../config/firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      console.log('Login successful', userCredential.user.email);
      navigation.navigate('UserList');
    } catch (error) {
      console.log('Login Error:', error.code, error.message);

      let message = 'Something went wrong. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is not valid.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'The password is incorrect.';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Invalid login credentials. Please try again.';  
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many login attempts. Please try again later.';  
      }

      Alert.alert('Login Failed', message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.title}>Ezo Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor='#ccc'
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor='#ccc'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
    height: 50, backgroundColor: '#fff', borderRadius: 8, color: '#000',
    paddingHorizontal: 16, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: '#ccc'
  },
  button: { backgroundColor: '#383184', paddingVertical: 14, borderRadius: 8, marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  linkText: { textAlign: 'center', color: '#383184', fontSize: 16 }
});

export default LoginScreen;
