import React from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import { Translate } from '../../lib';

export const ResetPasswordScreen = ({
  handleChangeText, handleResetPassword,
}) => (
  <SafeAreaView>
    <TextInput
      onChangeText={handleChangeText}
    />
    <Button title={Translate.t('auth.btnReset')} onPress={() => handleResetPassword()} />
  </SafeAreaView>
);
