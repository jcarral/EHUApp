import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';

export const LoginScreen = ({ handleChangeInput, handleLogin, values, handleNavigation }) => (
  <SafeAreaView>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeInput(text, 'email')}
      value={values.email}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeInput(text, 'password')}
      value={values.password}
      secureTextEntry
    />
    <Button onPress={handleLogin} title={'Login'} />
		<Button title={Translate.t('auth.login.resetPassword')} onPress={() => handleNavigation()} /> 
  </SafeAreaView>
);

