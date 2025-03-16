import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Users from '../src/screens/Users';
import {MockedProvider} from '@apollo/client/testing';
import {LIST_ZELLER_CUSTOMERS} from '../src/graphql/queries';
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

const mocks = [
  {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
      variables: {
        filter: {
          role: {
            eq: mockUserRole.ADMIN,
          },
        },
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
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
          ],
        },
      },
    },
  },
  {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
      variables: {
        filter: {
          role: {
            eq: mockUserRole.MANAGER,
          },
        },
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
            {
              id: '3',
              name: 'Manager One',
              email: 'manager1@example.com',
              role: mockUserRole.MANAGER,
            },
          ],
        },
      },
    },
  },
];

describe('Users Component', () => {
  it('renders correctly with users', async () => {
    const {getByText, getByTestId, getAllByText} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>,
    );

    // Initially should show loading state
    expect(getByTestId('loading-indicator')).toBeTruthy();

    // Wait for data to load
    await waitFor(() => {
      expect(getByText(strings.userTypes)).toBeTruthy();
      expect(getByText('John Smith')).toBeTruthy();
      expect(getByText('Adam Muller')).toBeTruthy();
    });
  });

  it('switches to manager users on tab press', async () => {
    const {getByText, getAllByText} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>,
    );

    // Wait for data to load
    await waitFor(() => {
      expect(getByText('John Smith')).toBeTruthy();
    });

    // Find all elements with the text 'MANAGER' and click the first one (the radio button)
    const managerElements = getAllByText('MANAGER');
    fireEvent.press(managerElements[0]);

    // Wait for manager data to load
    await waitFor(() => {
      expect(getByText('Manager One')).toBeTruthy();
    });
  });
});
