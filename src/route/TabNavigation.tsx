import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Users from '../screens/Users';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../Constants/colors';
import strings from '../Constants/strings';

const Tab = createBottomTabNavigator();

const TabIcon = ({name, focused}: {name: string; focused: boolean}) => {
  return (
    <View style={styles.tabIconContainer}>
      <Text
        style={[
          styles.tabIconText,
          {color: focused ? colors.primary : colors.placeholderGrey},
        ]}>
        {name.charAt(0)}
      </Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholderGrey,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.white,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.headerBorder,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}>
      <Tab.Screen
        name={strings.homeTab}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name={strings.homeTab} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name={strings.usersTab}
        component={Users}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name={strings.usersTab} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
