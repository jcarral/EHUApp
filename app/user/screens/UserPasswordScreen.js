import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button, } from 'react-native';
import { Translate } from '../../lib';

export const UserPasswordScreen = ({ handleChangeText, values, handleUpdatePassword }) => {
	return (
		<SafeAreaView>
			<TextInput
				style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				onChangeText={text => handleChangeText(text, 'actual')}
				value={values.actual}
				placeholder={Translate.t('user.password.current')}
				secureTextEntry
			/>
			<TextInput
				style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				onChangeText={text => handleChangeText(text, 'next')}
				value={values.next}
				placeholder={Translate.t('user.password.new')}
				secureTextEntry
			/>
			<TextInput
				style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				onChangeText={text => handleChangeText(text, 'nextRepeat')}
				value={values.nextRepeat}
				placeholder={Translate.t('user.password.repeat')}
				secureTextEntry
			/>
			<Button title={Translate.t('user.password.btnConfirm')} onPress={() => handleUpdatePassword()} />
		</SafeAreaView>
	);
};
