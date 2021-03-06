import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  backgroundWrapper: {
    flex: 1,
    backgroundColor: colors.backgroundDarker,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    borderColor: colors.darkTransparent,
  },

  header: {
    backgroundColor: colors.backgroundDarker,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkTransparent,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'iOS' ? getStatusBarHeight() : 0 + 10,
    height: 54 + (Platform.OS === 'iOS' ? getStatusBarHeight() : 0) + 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  teamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default styles;
