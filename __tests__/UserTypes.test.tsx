import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserTypes from '../src/screens/Users/UserTypes';
import strings from '../src/Constants/strings';
import {UserRole} from '../src/Constants/enums';

describe('UserTypes Component', () => {
  it('renders correctly with props', () => {
    const mockOnRoleChange = jest.fn();
    const {getByText} = render(
      <UserTypes
        selectedRole={UserRole.ADMIN}
        onRoleChange={mockOnRoleChange}
      />,
    );

    expect(getByText(strings.userTypes)).toBeTruthy();
    expect(getByText(UserRole.ADMIN)).toBeTruthy();
    expect(getByText(UserRole.MANAGER)).toBeTruthy();
  });

  it('calls onRoleChange when a role is selected', () => {
    const mockOnRoleChange = jest.fn();
    const {getByText} = render(
      <UserTypes
        selectedRole={UserRole.ADMIN}
        onRoleChange={mockOnRoleChange}
      />,
    );

    fireEvent.press(getByText(UserRole.MANAGER));
    expect(mockOnRoleChange).toHaveBeenCalledWith(UserRole.MANAGER);
  });
});
