import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert, // Add this import
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  X, // Changed from XCircle
  CheckCircle, 
  RotateCcw 
} from 'lucide-react-native';

// Rest of the component remains the same, but update the icon usage:
// Replace XCircle with X in the component
export default function BookingsScreen() {
  const { bookings, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [activeTab, bookings]);

  const loadBookings = async () => {
    // Mock data - replace with actual Supabase call
    const mockBookings = [
      {
        id: '1',
        barberId: '1',
        barberName: 'Marcus Johnson',
        barberImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400',
        service: 'Haircut + Beard Trim',
        date: '2024-01-15',
        time: '10:30 AM',
        duration: '45 min',
        price: 35,
        status: 'upcoming',
        location: 'Downtown Barbershop',
        address: '123 Main Street, Downtown',
        phone: '+1 (555) 123-4567',
      },
      {
        id: '2',
        barberId: '2',
        barberName: 'David Rodriguez',
        barberImage: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
        service: 'Classic Haircut',
        date: '2024-01-20',
        time: '2:00 PM',
        duration: '30 min',
        price: 25,
        status: 'upcoming',
        location: 'Midtown Barbershop',
        address: '456 Oak Avenue, Midtown',
        phone: '+1 (555) 123-4568',
      },
      {
        id: '3',
        barberId: '1',
        barberName: 'Marcus Johnson',
        barberImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400',
        service: 'Beard Trim',
        date: '2024-01-10',
        time: '11:00 AM',
        duration: '20 min',
        price: 15,
        status: 'completed',
        location: 'Downtown Barbershop',
        address: '123 Main Street, Downtown',
        phone: '+1 (555) 123-4567',
      },
    ];
    dispatch({ type: 'SET_BOOKINGS', payload: mockBookings });
  };

  const filterBookings = () => {
    const filtered = bookings.filter(booking => {
      if (activeTab === 'upcoming') {
        return booking.status === 'upcoming';
      } else if (activeTab === 'completed') {
        return booking.status === 'completed';
      } else if (activeTab === 'cancelled') {
        return booking.status === 'cancelled';
      }
      return true;
    });
    setFilteredBookings(filtered);
  };

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            // Update booking status to cancelled
            const updatedBookings = bookings.map(booking =>
              booking.id === bookingId
                ? { ...booking, status: 'cancelled' }
                : booking
            );
            dispatch({ type: 'SET_BOOKINGS', payload: updatedBookings });
          },
        },
      ]
    );
  };

  const handleRescheduleBooking = (bookingId) => {
    Alert.alert('Reschedule', 'Reschedule functionality coming soon!');
  };

  const handleMessageBarber = (barberId) => {
    Alert.alert('Chat', 'Chat functionality coming soon!');
  };

  const handleCallBarber = (phone) => {
    // Open phone dialer
    console.log('Call barber:', phone);
  };

  const renderBookingCard = (booking) => (
    <View key={booking.id} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Image source={{ uri: booking.barberImage }} style={styles.barberImage} />
        <View style={styles.bookingInfo}>
          <Text style={styles.barberName}>{booking.barberName}</Text>
          <Text style={styles.serviceName}>{booking.service}</Text>
          <View style={styles.dateTimeContainer}>
            <Calendar size={14} color={Colors.textMuted} />
            <Text style={styles.dateTime}>{booking.date}</Text>
            <Clock size={14} color={Colors.textMuted} />
            <Text style={styles.dateTime}>{booking.time}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${booking.price}</Text>
          <Text style={styles.duration}>{booking.duration}</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <MapPin size={14} color={Colors.textMuted} />
        <Text style={styles.location}>{booking.location}</Text>
      </View>

      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCallBarber(booking.phone)}
        >
          <Phone size={16} color={Colors.secondary} />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleMessageBarber(booking.barberId)}
        >
          <MessageCircle size={16} color={Colors.secondary} />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        
        {booking.status === 'upcoming' && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleRescheduleBooking(booking.id)}
            >
              <RotateCcw size={16} color={Colors.warning} />
              <Text style={[styles.actionButtonText, { color: Colors.warning }]}>
                Reschedule
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCancelBooking(booking.id)}
            >
              <XCircle size={16} color={Colors.error} />
              <Text style={[styles.actionButtonText, { color: Colors.error }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={Colors.blackGradient} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Bookings</Text>
        </View>

        <View style={styles.tabContainer}>
          {['upcoming', 'completed', 'cancelled'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.scrollView}>
          {filteredBookings.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No {activeTab} bookings found
              </Text>
            </View>
          ) : (
            filteredBookings.map(renderBookingCard)
          )}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: Fonts.sizes.xxl,
    color: Colors.text,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.secondary,
  },
  tabText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.text,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: Fonts.sizes.md,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  bookingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  barberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: Fonts.sizes.md,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTime: {
    fontSize: Fonts.sizes.xs,
    color: Colors.textMuted,
    marginRight: 8,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: Fonts.sizes.lg,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: Fonts.sizes.xs,
    color: Colors.textMuted,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  location: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  actionButtonText: {
    fontSize: Fonts.sizes.xs,
    color: Colors.secondary,
    fontWeight: '600',
  },
});