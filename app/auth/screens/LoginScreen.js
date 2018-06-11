import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import { Translate } from '../../lib';
import { safearea } from '../../assets';
import { colors } from '../../config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  safeLogin: {
    backgroundColor: colors.black,
  },
  loginBtn: {
    backgroundColor: colors.green,
    marginTop: 20,
  },
  signupBtn: {
    backgroundColor: colors.lightGrey,
    margin: 0,
  },
  resetText: {
    color: colors.darkGrey,
    margin: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  formContainer: {
    margin: 10,
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: 30,
  },
  titleTxt: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 34,
    textAlign: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 150,
  },
});

export const LoginScreen = ({
  handleChangeInput, handleLogin, values, handleNavigation,
}) => (
  <SafeAreaView style={[safearea.container, styles.safeLogin]}>
    <View style={[styles.container]}>
      <View style={[styles.headerContainer]}>
        <Image style={{ width: 100, height: 100 }} source={require('../../assets/images/logo-ehu-white.png')} />
        <Text style={[styles.titleTxt]}> EHUApp </Text>
      </View>
      <View style={[styles.formContainer]}>
        <FormInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => handleChangeInput(text, 'email')}
          value={values.email}
          placeholder={Translate.t('auth.login.email')}
          autoCorrect={false}
        />
        <FormInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => handleChangeInput(text, 'password')}
          value={values.password}
          placeholder={Translate.t('auth.login.password')}
          secureTextEntry
        />
        <Text onPress={() => handleNavigation('ResetPassword')} style={[styles.resetText]}>
          {Translate.t('auth.login.resetPassword')}
        </Text>
        <Button
          iconRight={{ name: 'sign-in', type: 'font-awesome', color: colors.white }}
          onPress={handleLogin}
          title={Translate.t('auth.login.loginBtn')}
          buttonStyle={[styles.loginBtn]}
          textStyle={{ color: colors.white }}
        />
      </View>
      <Button
        iconRight={{ name: 'sign-out', type: 'font-awesome', color: colors.darkGrey }}
        onPress={() => handleNavigation('SignUp')}
        title={Translate.t('auth.login.signUpBtn')}
        buttonStyle={[styles.signupBtn]}
        textStyle={{ color: colors.darkGrey }}
      />
    </View>
  </SafeAreaView>
);

