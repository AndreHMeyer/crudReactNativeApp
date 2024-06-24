import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './index';
import TabOneScreen from './survivalItems';
import TabTwoScreen from './/hygieneItems';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IndexScreen" component={IndexScreen} />
      <Stack.Screen name="TabOneScreen" component={TabOneScreen} />
      <Stack.Screen name="TabTwoScreen" component={TabTwoScreen} />
      {}
    </Stack.Navigator>
  );
}

export default AppNavigator;
