import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import TodosScreen from './src/screens/TodosScreen';
import HomeScreen from './src/screens/HomeScreen';
import AnimationScreen from './src/screens/AnimationScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{title:"Home"}} name="Todos" component={TodosScreen} />
        <Stack.Screen name="Anime" component={AnimationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
