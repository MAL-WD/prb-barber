import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

export default function ManageServicesScreen() {
  return (
    <LinearGradient colors={Colors.blackGradient} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>Manage Services</Text>
        <Text style={styles.subtitle}>Coming soon...</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: Fonts.sizes.xxl,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Fonts.sizes.md,
    color: Colors.textMuted,
  },
});