import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors, general } from '../../styles';

const styles = StyleSheet.create({
  ...general.buttonStyles,

  container: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: colors.darkTransparent,
    backgroundColor: colors.backgroundDarker,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'iOS' ? getStatusBarHeight() : 0 + 25,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },

  memberList: {
    marginTop: 20,
  },

  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  memberName: {
    color: colors.lighter,
    fontSize: 16,
  },
});

export default styles;
