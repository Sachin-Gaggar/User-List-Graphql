import React from 'react';
import {render} from '@testing-library/react-native';
import UserList from '../src/screens/Users/UserList';
import strings from '../src/Constants/strings';

// Mock the enums module
jest.mock('../src/Constants/enums', () => ({
  UserRole: {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
  },
}));

const mockUserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
};

const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: mockUserRole.ADMIN,
  },
  {
    id: '2',
    name: 'Adam Muller',
    email: 'adam@example.com',
    role: mockUserRole.ADMIN,
  },
];

describe('UserList Component', () => {
  const mockHeaderComponent = <></>;
  const mockRefresh = jest.fn();

  it('renders correctly with users', () => {
    const {getByText} = render(
      <UserList
        users={mockUsers}
        selectedRole={mockUserRole.ADMIN}
        refreshing={false}
        onRefresh={mockRefresh}
        ListHeaderComponent={mockHeaderComponent}
      />,
    );

    expect(getByText(strings.adminUsers)).toBeTruthy();
    expect(getByText('John Smith')).toBeTruthy();
    expect(getByText('Adam Muller')).toBeTruthy();
  });

  it('renders user initials correctly', () => {
    const {getAllByText} = render(
      <UserList
        users={mockUsers}
        selectedRole={mockUserRole.ADMIN}
        refreshing={false}
        onRefresh={mockRefresh}
        ListHeaderComponent={mockHeaderComponent}
      />,
    );

    expect(getAllByText('J')[0]).toBeTruthy();
    expect(getAllByText('A')[0]).toBeTruthy();
  });

  it('renders empty list when no users provided', () => {
    const {getByText, queryByText} = render(
      <UserList
        users={[]}
        selectedRole={mockUserRole.ADMIN}
        refreshing={false}
        onRefresh={mockRefresh}
        ListHeaderComponent={mockHeaderComponent}
      />,
    );

    expect(getByText(strings.adminUsers)).toBeTruthy();
    expect(queryByText('John Smith')).toBeNull();
  });
});
