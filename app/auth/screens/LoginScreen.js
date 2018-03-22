import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';
import { Translate } from '../../lib';

export const LoginScreen = ({ handleChangeInput, handleLogin, values }) => (
  <SafeAreaView>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeInput(text, 'email')}
      value={values.email}
      placeholder={Translate.t('auth.login.email')}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeInput(text, 'password')}
      value={values.password}
      placeholder={Translate.t('auth.login.password')}
      secureTextEntry
    />
    <Button onPress={handleLogin} title={Translate.t('auth.login.loginBtn')} />
  </SafeAreaView>
);

