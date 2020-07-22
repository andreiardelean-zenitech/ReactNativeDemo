import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EventList from './EventList';
import EventForm from './EventForm';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillReceiveProps has been renamed',
  'Animated: `useNativeDriver` was not specified',
]);

const AppNavigator = createStackNavigator(
  {
    list: EventList,
    form: EventForm
  },
  {
    initialRouteName: 'list',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// export default StackNavigator({
//   list: {
//     screen: EventList,
//     // navigationOptions: () => ({
//     //   title: 'Your events',
//     // }),
//   },
//   form: {
//     screen: EventForm,
//     // navigationOptions: ({ navigation }) => ({
//     //   title: navigation.state.title, // <=== remove this
//     // }),
//   },
// });
