import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Translate } from '../../lib';
import { colors } from '../../config';

export const UserProfileScreen = ({ user, handleNavigation, subjects, teachers, handleLogout }) => {
  const avatar = (user.avatar)? { uri : user.avatar } : require('../../assets/images/defaultAvatar.png');
  console.log(user)
  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.container}>
        <View>
          <Image source={ avatar } style={ [ styles.avatar, ] }/>
          <Text> { user.displayName } </Text>
        </View>
        <View style={[styles.btnArea,]}>
          <Icon onPress={() => { }} name='book' type='font-awesome' raised />
          <Icon onPress={() => { }} name='graduation-cap' type='font-awesome' raised />
          <Icon onPress={() => { handleNavigation('UserEdit') }} name='edit' type='font-awesome' raised />
          <Icon onPress={() => handleNavigation('Languages')} name='flag' type='font-awesome' raised />
        </View>
      </View>
      <View>
				<Button title="logout" onPress={() => handleLogout()}/>
				<Button title="password" onPress={() => handleNavigation('UserPassword')}/>
      </View>
    </SafeAreaView>
  );
};

const DetailsView = ({}) => (
  <View>

  </View>
);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.black,
    flex: 1
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  btnArea: {
    flexDirection: 'row',
    backgroundColor: colors.black,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 80,
    height: 180,
    width: 180,
  },
});
