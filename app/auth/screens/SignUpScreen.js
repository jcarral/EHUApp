import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';

export const SignUpScreen = ({ values, handleSignUp, handleChangeText }) => (
  <SafeAreaView>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'email')}
      value={values.email}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'password')}
      value={values.password}
      secureTextEntry      
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'password2')}
      value={values.password2}
      secureTextEntry      
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'name')}
      value={values.name}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'surname')}
      value={values.surname}
    />
    <Button title={'SignUp'} onPress={handleSignUp} />
  </SafeAreaView>
);
