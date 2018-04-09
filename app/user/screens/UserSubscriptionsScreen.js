import React from 'react';
import { SafeAreaView, ListView, View, Text, StyleSheet, TextInput } from 'react-native';

import { SectionDivider, EmptyList, SectionListHeader, ListRow } from '../../components';
import { Translate } from '../../lib';
import { safearea } from '../../assets';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

export const UserSubscriptionsScreen = ({ dataSource, handleNavigateTo }) => (
  <SafeAreaView style={[safearea.whitesafe, safearea.container]}>
    {
      !dataSource
      && (<EmptyList title={Translate.t('user.subs.emptyList')} />)
    }
    {
      dataSource
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
        renderSectionHeader={(data, category) => <SectionListHeader>{category}</SectionListHeader>}
      />
    }
  </SafeAreaView>
);

const Header = props => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      onChangeText={text => console.log('searching for ', text)}
    />
  </View>
);
