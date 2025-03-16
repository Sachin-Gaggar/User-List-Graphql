import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useQuery} from '@apollo/client';
import UserTypes from './UserTypes';
import UserList from './UserList';
import colors from '../../Constants/colors';
import strings from '../../Constants/strings';
import {UserRole} from '../../Constants/enums';
import {LIST_ZELLER_CUSTOMERS} from '../../graphql/queries';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const Users = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.ADMIN);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {loading, error, data, refetch} = useQuery(LIST_ZELLER_CUSTOMERS, {
    variables: {
      filter: {
        role: {
          eq: selectedRole,
        },
      },
    },
  });

  useEffect(() => {
    if (data && data.listZellerCustomers && data.listZellerCustomers.items) {
      const users = data.listZellerCustomers.items;
      if (searchQuery.trim() === '') {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter((user: User) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredUsers(filtered);
      }
    }
  }, [data, searchQuery]);

  useEffect(() => {
    refetch({
      filter: {
        role: {
          eq: selectedRole,
        },
      },
    });
  }, [selectedRole, refetch]);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setSearchQuery('');
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const renderListHeader = () => (
    <>
      <UserTypes selectedRole={selectedRole} onRoleChange={handleRoleChange} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={strings.searchPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.placeholderGrey}
        />
      </View>
    </>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          testID="loading-indicator"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {strings.errorLoadingUsers} {error.message}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserList
        users={filteredUsers}
        selectedRole={selectedRole}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={renderListHeader()}
      />
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.mediumGrey,
  },
});
