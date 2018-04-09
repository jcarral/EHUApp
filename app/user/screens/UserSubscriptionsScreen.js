import React from 'react';
import { SafeAreaView, ListView, View, Text } from 'react-native';

import { SectionDivider, EmptyList } from '../../components';
import { Translate } from '../../lib';

export const UserSubscriptionsScreen = ({ dataSource }) => (
  <SafeAreaView>
    {
      !dataSource
      && (<EmptyList title={Translate.t('user.subs.emptyList')} />)
    }
    {
      dataSource
      && <ListView
        dataSource={dataSource}
        renderRow={data => <View><Text>{data}</Text></View>}
      />
    }
  </SafeAreaView>
);

const Row = () => (
  <View />
);
