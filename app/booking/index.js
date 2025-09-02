import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { ArrowLeft, Calendar, Clock, CreditCard } from 'lucide-react-native';

export default function BookingScreen() {
  const { barberId, serviceId } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select date and time');
      return;
    }
    
    Alert.alert('Success', 'Booking confirmed!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <LinearGradient colors={Colors.blackGradient} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Book Appointment</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <View style={styles.dateContainer}>
              <Calendar size={20} color={Colors.secondary} />
              <Text style={styles.placeholder}>Date selection coming soon</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeContainer}>
              <Clock size={20} color={Colors.secondary} />
              <Text style={styles.placeholder}>Time selection coming soon</Text>
            </View>
          </View>

          <LinearGradient colors={Colors.goldGradient} style={styles.bookButton}>
            <TouchableOpacity
              style={styles.bookButtonInner}
              onPress={handleBooking}
            >
              <CreditCard size={20} color={Colors.primary} />
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  backButton: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: Fonts.sizes.xl,
    color: Colors.text,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  placeholder: {
    fontSize: Fonts.sizes.md,
    color: Colors.textMuted,
  },
  bookButton: {
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  bookButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  bookButtonText: {
    fontSize: Fonts.sizes.md,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});