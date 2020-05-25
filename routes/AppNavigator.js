import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainNavigator from './MainNavigator';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Loading from '../screens/Loading';

export default createAppContainer (
  createSwitchNavigator (
    {
      Loading,
      SignUp,
      Login,
      MainNavigator
    },
    { initialRouteName: 'Loading' }
  )
)