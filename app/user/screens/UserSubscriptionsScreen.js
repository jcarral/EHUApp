import React from 'react';
import { SafeAreaView, ListView, View, Text, StyleSheet, TextInput } from 'react-native';

import { SectionDivider, EmptyList, SectionListHeader, ListRow } from '../../components';
import { Translate } from '../../lib';
import { safearea } from '../../assets';
import { colors } from '../../config';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  header: {
    padding: 20,
    backgroundColor: colors.black,
  },
  headerText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export const UserSubscriptionsScreen = ({ dataSource, handleNavigateTo }) => (
  <SafeAreaView style={[safearea.blackSafe, safearea.container]}>
    <View style={[styles.container]}>
      {
      (!dataSource || dataSource.getRowCount() === 0)
      && (<EmptyList title={Translate.t('user.subs.emptyList')} />)
      }
      {
        (dataSource && dataSource.getRowCount() > 0)
        && <ListView
          dataSource={dataSource}
          renderRow={data => (
            <ListRow
              onPress={() => handleNavigateTo(data.type, data.key)}
            >
              { data.name }
            </ListRow>
            )
          }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderHeader={() => <Header />}
          renderSectionHeader={(data, category) =>
            <SectionListHeader>{category}</SectionListHeader>
          }
        />
      }
    </View>
  </SafeAreaView>
);

const Header = props => (
  <View style={[styles.header]}>
    <Text style={[styles.headerText]}> { Translate.t('user.subs.header')} </Text>
  </View>
);
