/**
 * @format
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

// Mock the navigation components
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => (
    <>{children}</>
  ),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
    Screen: () => null,
  }),
}));

jest.mock('../src/route', () => {
  return () => <div>Mocked Navigation</div>;
});

test('renders without crashing', () => {
  render(<App />);
});
