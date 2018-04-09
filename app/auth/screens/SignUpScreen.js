import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { Translate } from '../../lib';
import { safearea, form } from '../../assets';
import { colors } from '../../config';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  formContainer: {
    margin: 10,
    padding: 30,
  },
  btnSignup: {
    backgroundColor: colors.green,
    marginTop: 30,
  },
});

export const SignUpScreen = ({ values, handleSignUp, handleChangeText }) => (
  <SafeAreaView style={[safearea.container, safearea.blackSafe, styles.container]}>
    <View style={[form.formContainer, styles.formContainer]}>
      <FormInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => handleChangeText(text, 'name')}
        value={values.name}
        placeholder={Translate.t('auth.signup.name')}
        containerStyle={[form.input]}
      />
      <FormInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => handleChangeText(text, 'surname')}
        value={values.surname}
        placeholder={Translate.t('auth.signup.surname')}
        containerStyle={[form.input]}
      />
      <FormInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => handleChangeText(text, 'email')}
        value={values.email}
        placeholder={Translate.t('auth.signup.email')}
        containerStyle={[form.input]}
      />
      <FormInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => handleChangeText(text, 'password')}
        value={values.password}
        placeholder={Translate.t('auth.signup.password')}
        containerStyle={[form.input]}
        secureTextEntry
      />
      <FormInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => handleChangeText(text, 'password2')}
        value={values.password2}
        placeholder={Translate.t('auth.signup.repeatPass')}
        containerStyle={[form.input]}
        secureTextEntry
      />
      <Button
        title={Translate.t('auth.signup.confirmBtn')}
        onPress={handleSignUp}
        buttonStyle={[styles.btnSignup]}
      />
    </View>
  </SafeAreaView>
);
