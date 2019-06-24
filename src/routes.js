import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './pages/Main';
import SignIn from './pages/SignIn';

const createNavigator = (isLoggedIn = false) => createAppContainer(
  createSwitchNavigator({ Main, SignIn }, { initialRouteName: isLoggedIn ? 'Main' : 'SignIn' }),
);
export default createNavigator;
