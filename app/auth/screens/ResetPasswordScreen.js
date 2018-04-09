import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { Translate } from '../../lib';
import { safearea } from '../../assets';
import { colors } from '../../config';

const styles = StyleSheet.create({
  safeReset: {
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  formContainer: {
    margin: 10,
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: 30,
    marginTop: 50,
  },
  btnReset: {
    backgroundColor: colors.green,
    marginTop: 30,
  },
  txtSub: {
    color: colors.lightGrey,
    textAlign: 'center',
  },
  txtTitle: {
    fontSize: 30,
    color: colors.lightGrey,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const ResetPasswordScreen = ({
  handleChangeText, handleResetPassword,
}) => (
  <SafeAreaView style={[safearea.container, styles.safeReset]}>
    <View>
      <Text style={[styles.txtTitle]}>{Translate.t('auth.resetTitle')}</Text>
      <Text style={[styles.txtSub]}>{Translate.t('auth.resetSub')}</Text>
    </View>
    <View style={[styles.formContainer]}>
      <FormInput
        onChangeText={handleChangeText}
        placeholder={Translate.t('auth.resetPlaceholder')}
      />
      <Button
        title={Translate.t('auth.btnReset')}
        onPress={() => handleResetPassword()}
        buttonStyle={[styles.btnReset]}
      />
    </View>
  </SafeAreaView>
);
