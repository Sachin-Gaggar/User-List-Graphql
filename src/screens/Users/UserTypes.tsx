import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../Constants/colors';
import strings from '../../Constants/strings';
import {UserRole} from '../../Constants/enums';

interface UserTypesProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const UserTypes = ({selectedRole, onRoleChange}: UserTypesProps) => {
  const roles = [UserRole.ADMIN, UserRole.MANAGER];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.userTypes}</Text>
      {roles.map(role => (
        <TouchableOpacity
          key={role}
          style={styles.roleContainer}
          onPress={() => onRoleChange(role)}
          activeOpacity={0.7}>
          <View
            style={[
              styles.radioButton,
              selectedRole === role && styles.radioSelected,
            ]}>
            {selectedRole === role && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.roleText}>{role}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserTypes;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
  },
  roleText: {
    fontSize: 16,
    marginLeft: 12,
    color: colors.darkTextGrey,
  },
});
