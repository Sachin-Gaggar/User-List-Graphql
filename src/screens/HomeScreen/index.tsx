import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import colors from '../../Constants/colors';
import strings from '../../Constants/strings';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{strings.welcomeMessage}</Text>
        <Text style={styles.subtitle}>{strings.tabNavInfo}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textGrey,
    textAlign: 'center',
  },
});
