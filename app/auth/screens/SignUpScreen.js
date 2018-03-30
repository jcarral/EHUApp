import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';
import { Translate } from '../../lib';

export const SignUpScreen = ({ values, handleSignUp, handleChangeText }) => (
  <SafeAreaView>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'email')}
      value={values.email}
      placeholder={Translate.t('auth.signup.email')}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'password')}
      value={values.password}
      placeholder={Translate.t('auth.signup.password')}
      secureTextEntry      
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'password2')}
      value={values.password2}
      placeholder={Translate.t('auth.signup.repeatPass')}
      secureTextEntry      
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'name')}
      value={values.name}
      placeholder={Translate.t('auth.signup.name')}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => handleChangeText(text, 'surname')}
      value={values.surname}
      placeholder={Translate.t('auth.signup.surname')}
    />
    <Button title={Translate.t('auth.signup.confirmBtn')} onPress={handleSignUp} />
  </SafeAreaView>
);
