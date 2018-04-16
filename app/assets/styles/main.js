import { StyleSheet } from 'react-native';
import { colors } from '../../config';

export const safearea = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackSafe: {
    backgroundColor: colors.black,
  },
  whitesafe: {
    backgroundColor: colors.white,
  },
});
