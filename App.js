import React from 'react';
import Home from './src/component/home/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ViewData from './src/component/viewData/index';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={ViewData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
