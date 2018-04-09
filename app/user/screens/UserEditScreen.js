import React from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Button, Icon, FormInput } from 'react-native-elements';
import { colors } from '../../config';
import { safearea, form } from '../../assets';
import { Translate } from '../../lib';

const styles = StyleSheet.create({
  safe: {
    justifyContent: 'space-between',
    flex: 1,
  },
  formContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginTop: 10,
  },
  btnPassword: {
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    borderColor: colors.grey,
    marginBottom: 10,
  },
  btnSave: {
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.green,
    marginTop: 20,
  },
  dropdown: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    margin: 10,
  },
  labelTxt: {
    fontWeight: 'bold',
    color: colors.darkGrey,
    fontSize: 16,
  },
});

const Label = ({ text }) => (
  <View style={[styles.label]}>
    <Text style={[styles.labelTxt]}> { text } </Text>
  </View>
);

export const UserEditScreen = ({
  handleUpdateProfile, handleNavigation, genders, values, handleChangeText,
}) => (
  <SafeAreaView style={[safearea.container, safearea.whitesafe, styles.safe]}>
    <View style={[styles.titleContainer]}>
      <Icon name='edit' type='font-awesome' iconStyle={{ fontSize: 60, color: colors.darkGrey }} />
      <Text style={[styles.titleText]}> {Translate.t('user.edit.title')} </Text>
    </View>
    <View style={[form.formContainer, styles.formContainer]}>
      <Label text={Translate.t('user.edit.displayNameLabel')} />
      <FormInput
        value={values.displayName}
        placeholder={Translate.t('user.edit.displayName')}
        onChangeText={text => handleChangeText('displayName', text)}
      />
      <Label text={Translate.t('user.edit.genderLabel')} />
      <View style={[styles.dropdown]}>
        <Dropdown
          data={genders}
          onChangeText={(item, i) => handleChangeText('gender', item)}
          value={values.gender}
          containerStyle={{ marginTop: -30 }}
        />
      </View>
      <Label text={Translate.t('user.edit.dateLabel')} />
      <DatePicker
        date={values.birthdate}
        mode="date"
        placeholder={Translate.t('user.edit.placeholderDate')}
        format="YYYY-MM-DD"
        minDate="1900-05-01"
        maxDate="2016-06-01"
        confirmBtnText={Translate.t('user.edit.confirmDate')}
        cancelBtnText={Translate.t('user.edit.cancelDate')}
        onDateChange={date => handleChangeText('birthdate', date)}
        customStyles={{ dateInput: { borderWidth: 0 } }}
      />
      <Button
        title={Translate.t('user.edit.saveBtn')}
        onPress={() => handleUpdateProfile()}
        icon={{ name: 'save', type: 'font-awesome', color: colors.black }}
        textStyle={{ color: colors.black, fontWeight: 'bold' }}
        buttonStyle={[styles.btnSave]}
      />
    </View>
    <View>
      <Button
        title={Translate.t('user.edit.passwordBtn')}
        onPress={() => handleNavigation('UserPassword')}
        icon={{ name: 'key', type: 'font-awesome', color: colors.darkGrey }}
        textStyle={{ color: colors.darkGrey, fontWeight: 'bold' }}
        buttonStyle={[styles.btnPassword]}
      />
    </View>
  </SafeAreaView>
);
