import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import History from '../screens/History';
import Profile from '../screens/Profile';
import Run from '../screens/Run';
import { View } from 'react-native';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-list'} />
          </View>
        ),
        activeColor: '#fff',
        inactiveColor: '#87D8BD',
        barStyle: { backgroundColor: '#58B18E' },
      }
    },
    Run: {
      screen: Run,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-walk'} />
          </View>
        ),
        activeColor: '#fff',
        inactiveColor: '#57D4DF',
        barStyle: { backgroundColor: '#2AB7CA' },
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
      }
    },
  },
  {
    initialRouteName: 'Run',
    activeColor: '#fff',
    inactiveColor: '#f4aba4',
    barStyle: { backgroundColor: '#EC6060' },
    shifting: true,
  }
)

export default createAppContainer(TabNavigator);