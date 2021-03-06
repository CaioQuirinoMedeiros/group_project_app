import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.darkTransparent,
    backgroundColor: colors.backgroundDarker,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'iOS' ? getStatusBarHeight() : 0 + 25,
  },

  teamContainer: {
    marginBottom: 10,
  },

  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  newTeam: {
    marginVertical: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logOut: {
    marginVertical: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e83f19',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
