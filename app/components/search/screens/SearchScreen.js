import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';

import { colors } from '../../../config';

export const SearchScreen = ({onChange, onFinish, results}) => (
	<SafeAreaView style={styles.safe}>
		<View style={styles.container}> 
			<SearchBar onSubmitEditing={onFinish} onChangeText={onChange} />
			<Text> Search </Text>
			
		</View>
	</SafeAreaView>
);


const styles = StyleSheet.create({
	safe: {
		backgroundColor: colors.black,
		flex: 1
	},
	container: {
		backgroundColor: colors.white,
		flex: 1
	}
});
