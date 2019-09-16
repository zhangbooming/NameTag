import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight,TextInput  } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Share from './app/screens/Share.js';
import Search from './app/screens/Search.js';
import Profile from './app/screens/Profile.js';
import HomeScreen from './app/screens/HomeScreen.js';
import Group from './app/screens/Group.js';
import EnterCode from './app/screens/EnterCode.js';

const Nav = createStackNavigator({
  Home:{screen:HomeScreen,
        navigationOptions: () => ({
      headerTransparent: `true`,
    }),},
  Group:{ screen: Group, navigationOptions: () => ({
headerTransparent: `true`,
}), },
  Search:{ screen: Search, navigationOptions: () => ({
headerTransparent: `true`,
}),},
  Profile:{ screen: Profile, navigationOptions: () => ({
headerTransparent: `true`,
}), },
  EnterCode:{ screen: EnterCode, navigationOptions: () => ({
headerTransparent: `true`,
}),}
});

export default createAppContainer(Nav);

// const MainStack = createBottomTabNavigator(
//   {
//     Home:{ screen: HomeScreen},
//     Group:{ screen: Group },
//     Search:{ screen: Search },
//     Profile:{ screen: Profile }
//   }
// )
// const MainStack1 = createAppContainer(Nav);
//
// export default class App extends React.Component {
//
//   render() {
//     return (
//
//         <MainStack1/>
//
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC99FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
