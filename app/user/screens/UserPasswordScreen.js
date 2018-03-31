import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { FormInput, Button, Icon } from 'react-native-elements';
import { Translate } from '../../lib';
import { form, safearea } from '../../assets';
import { colors } from '../../config';

const styles = StyleSheet.create({
  confirmBtn: {
    backgroundColor: colors.blue,
    marginTop: 10,
  },
  formContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  safe: {
    justifyContent: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginTop: 10,
  },
});

export const UserPasswordScreen = ({ handleChangeText, values, handleUpdatePassword }) => (
  <SafeAreaView style={[safearea.container, safearea.whitesafe, styles.safe]}>
    <View style={[styles.titleContainer]}>
      <Icon type='font-awesome' name='unlock' iconStyle={{ fontSize: 60, color: colors.darkGrey }} />
      <Text style={[styles.titleText]}> {Translate.t('user.password.title')} </Text>
    </View>
    <View style={[form.formContainer, styles.formContainer]}>
      <FormInput
        onChangeText={text => handleChangeText(text, 'actual')}
        value={values.actual}
        placeholder={Translate.t('user.password.current')}
        secureTextEntry
        containerStyle={[form.input]}
      />
      <FormInput
        onChangeText={text => handleChangeText(text, 'next')}
        value={values.next}
        placeholder={Translate.t('user.password.new')}
        secureTextEntry
        containerStyle={[form.input]}
      />
      <FormInput
        onChangeText={text => handleChangeText(text, 'nextRepeat')}
        value={values.nextRepeat}
        placeholder={Translate.t('user.password.repeat')}
        secureTextEntry
        containerStyle={[form.input]}
      />
      <Button
        title={Translate.t('user.password.btnConfirm')}
        onPress={() => handleUpdatePassword()}
        iconRight={{ name: 'check-circle', type: 'font-awesome' }}
        buttonStyle={[styles.confirmBtn]}
      />
    </View>
  </SafeAreaView>
);

