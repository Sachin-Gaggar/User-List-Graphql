import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import colors from '../../Constants/colors';
import strings from '../../Constants/strings';
import {UserRole} from '../../Constants/enums';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserListProps {
  users: User[];
  selectedRole: UserRole;
  refreshing: boolean;
  onRefresh: () => void;
  ListHeaderComponent: React.ReactElement;
}

const UserList = ({
  users,
  selectedRole,
  refreshing,
  onRefresh,
  ListHeaderComponent,
}: UserListProps) => {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getTitle = () => {
    return selectedRole === UserRole.ADMIN
      ? strings.adminUsers
      : strings.managerUsers;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
            <Text style={styles.title}>{getTitle()}</Text>
          </>
        }
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <View style={styles.avatar}>
              <Text style={styles.initial}>{getInitial(item.name)}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userRole}>{item.role}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initial: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: colors.textGrey,
  },
  separator: {
    height: 1,
    backgroundColor: colors.separatorGrey,
  },
});
