import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Users from '../screens/Users';
import screens from '../Constants/screen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={screens.homeScreen} component={HomeScreen} />
      <Tab.Screen name={screens.users} component={Users} />
    </Tab.Navigator>
  );
};
export default TabNavigator;
