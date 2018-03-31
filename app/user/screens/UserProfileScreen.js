import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Translate } from '../../lib';
import { colors } from '../../config';
import { safearea } from '../../assets';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 90,
    height: 180,
    width: 180,
    borderWidth: 7,
    borderColor: colors.lightGrey,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnText: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  btnLogout: {
    margin: 10,
    backgroundColor: colors.lightRed,
  },
  languageBtn: {
    fontSize: 50,
    textAlign: 'right',
    color: colors.darkGrey,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  username: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.darkGrey,
  },
});

export const UserProfileScreen = ({
  user, handleNavigation, subjects, teachers, handleLogout,
}) => {
  const avatar = (user.avatar) ? { uri: user.avatar } : require('../../assets/images/defaultAvatar.png');

  return (
    <SafeAreaView style={[safearea.whitesafe, safearea.container]}>
      <Icon
        name='globe'
        type='font-awesome'
        iconStyle={[styles.languageBtn]}
        onPress={() => handleNavigation('Languages')}
      />
      <View style={styles.container}>
        <View>
          <Image source={avatar} style={[styles.avatar]} />
          <Text style={[styles.username]}> {user.displayName} </Text>
        </View>
        <View style={[styles.bottomContainer]}> 
          <TouchableHighlight style={[styles.btn]}>
            <View>
              <Icon name='graduation-cap' type='font-awesome' iconStyle={{ color: colors.green, fontSize: 40 }} />
              <Text style={[styles.btnText]}> {Translate.t('user.btnSubs')} </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.btn]} onPress={() => handleNavigation('UserEdit')}>
            <View>
              <Icon name='edit' type='font-awesome' iconStyle={{ color: colors.green, fontSize: 40 }} />
              <Text style={[styles.btnText]}> { Translate.t('user.btnEdit')} </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <Button
        title={Translate.t('user.btnLogout')}
        onPress={() => handleLogout()}
        iconRight={{ name: 'sign-out', type: 'font-awesome', color: colors.red }}
        textStyle={{ color: colors.red }}
        buttonStyle={[styles.btnLogout]}
        />
    </SafeAreaView>
  );
};

const DetailsView = () => (<View />);
