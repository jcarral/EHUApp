import { StyleSheet } from 'react-native';
import { colors } from '../../config';

export const safearea = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  blackSafe: {
    backgroundColor: colors.black,
  },
});
