import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert, // Add this import
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  Filter,
  User,        // Add these imports
  Calendar,    // Add these imports
  BarChart3,   // Add these imports
  Settings     // Add these imports
} from 'lucide-react-native';
import { router } from 'expo-router';

// Rest of the component code remains the same
export default function HomeScreen() {
  const { userRole, barbers, user, dispatch } = useApp();
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBarbers, setFilteredBarbers] = useState([]);
  const [selectedService, setSelectedService] = useState('all');

  useEffect(() => {
    loadBarbers();
  }, []);

  useEffect(() => {
    filterBarbers();
  }, [searchQuery, selectedService, barbers]);

  const loadBarbers = async () => {
    // Mock data - replace with actual Supabase call
    const mockBarbers = [
      {
        id: '1',
        name: 'Marcus Johnson',
        rating: 4.8,
        reviews: 127,
        image: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400',
        specialties: ['Haircut', 'Beard Trim', 'Styling'],
        location: 'Downtown',
        price: '$25-45',
        distance: '0.5 miles',
        available: true,
      },
      {
        id: '2',
        name: 'David Rodriguez',
        rating: 4.9,
        reviews: 203,
        image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
        specialties: ['Fade', 'Beard Trim', 'Hot Towel'],
        location: 'Midtown',
        price: '$30-50',
        distance: '1.2 miles',
        available: true,
      },
      {
        id: '3',
        name: 'Antonio Williams',
        rating: 4.7,
        reviews: 89,
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
        specialties: ['Classic Cut', 'Mustache', 'Styling'],
        location: 'Uptown',
        price: '$20-40',
        distance: '2.1 miles',
        available: false,
      },
    ];
    dispatch({ type: 'SET_BARBERS', payload: mockBarbers });
  };

  const filterBarbers = () => {
    let filtered = barbers;

    if (searchQuery) {
      filtered = filtered.filter(barber =>
        barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barber.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barber.specialties.some(specialty =>
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (selectedService !== 'all') {
      filtered = filtered.filter(barber =>
        barber.specialties.includes(selectedService)
      );
    }

    setFilteredBarbers(filtered);
  };

  const handleBarberPress = (barber) => {
    router.push({
      pathname: '/barber-profile',
      params: { barberId: barber.id },
    });
  };

  const renderCustomerHome = () => (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.greeting, isRTL && styles.rtlText]}>{t('goodMorning')}</Text>
          <Text style={styles.userName}>{user?.user_metadata?.full_name || 'User'}</Text>
          <Text style={[styles.subtitle, isRTL && styles.rtlText]}>{t('findPerfectBarber')}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('services')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'Haircut', 'Beard Trim', 'Styling', 'Fade'].map((service) => (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceChip,
                selectedService === service && styles.serviceChipActive,
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text
                style={[
                  styles.serviceChipText,
                  selectedService === service && styles.serviceChipTextActive,
                ]}
              >
                {service === 'all' ? t('all') : service}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.barbersContainer}>
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('popularBarbers')}</Text>
        {filteredBarbers.map((barber) => (
          <TouchableOpacity
            key={barber.id}
            style={styles.barberCard}
            onPress={() => handleBarberPress(barber)}
          >
            <Image source={{ uri: barber.image }} style={styles.barberImage} />
            <View style={styles.barberInfo}>
              <View style={styles.barberHeader}>
                <Text style={styles.barberName}>{barber.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color={Colors.secondary} fill={Colors.secondary} />
                  <Text style={styles.rating}>{barber.rating}</Text>
                  <Text style={styles.reviews}>({barber.reviews})</Text>
                </View>
              </View>
              <View style={styles.barberDetails}>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color={Colors.textMuted} />
                  <Text style={styles.location}>{barber.location}</Text>
                  <Text style={styles.distance}>• {barber.distance}</Text>
                </View>
                <Text style={styles.price}>{barber.price}</Text>
              </View>
              <View style={styles.specialtiesContainer}>
                {barber.specialties.slice(0, 3).map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.availabilityContainer}>
                <View style={[
                  styles.availabilityDot,
                  { backgroundColor: barber.available ? Colors.success : Colors.error }
                ]} />
                <Text style={styles.availabilityText}>
                  {barber.available ? t('availableToday') : t('busy')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderBarberDashboard = () => (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.greeting, isRTL && styles.rtlText]}>{t('welcomeBack')}</Text>
          <Text style={styles.userName}>{user?.user_metadata?.full_name || 'Barber'}</Text>
          <Text style={[styles.subtitle, isRTL && styles.rtlText]}>{t('yourAppointmentsToday')}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>8</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('todaysBookings')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$320</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('todaysEarnings')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('rating')}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Next Appointment</Text>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentHeader}>
            <Text style={styles.appointmentTime}>10:30 AM</Text>
            <Text style={styles.appointmentService}>Haircut + Beard Trim</Text>
          </View>
          <View style={styles.appointmentClient}>
            <Text style={styles.clientName}>John Smith</Text>
            <Text style={styles.appointmentDuration}>45 min</Text>
          </View>
          <View style={styles.appointmentActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Start Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderAdminDashboard = () => (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.greeting, isRTL && styles.rtlText]}>{t('adminDashboard')}</Text>
          <Text style={[styles.subtitle, isRTL && styles.rtlText]}>{t('manageBarberShop')}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.adminStatsContainer}>
        <View style={styles.adminStatCard}>
          <Text style={styles.adminStatValue}>24</Text>
          <Text style={[styles.adminStatLabel, isRTL && styles.rtlText]}>{t('activeBarbers')}</Text>
          <Text style={[styles.adminStatChange, isRTL && styles.rtlText]}>+2 {t('thisWeek')}</Text>
        </View>
        <View style={styles.adminStatCard}>
          <Text style={styles.adminStatValue}>156</Text>
          <Text style={[styles.adminStatLabel, isRTL && styles.rtlText]}>{t('todaysBookings')}</Text>
          <Text style={[styles.adminStatChange, isRTL && styles.rtlText]}>+12% {t('vsYesterday')}</Text>
        </View>
        <View style={styles.adminStatCard}>
          <Text style={styles.adminStatValue}>$4,280</Text>
          <Text style={[styles.adminStatLabel, isRTL && styles.rtlText]}>{t('todaysRevenue')}</Text>
          <Text style={[styles.adminStatChange, isRTL && styles.rtlText]}>+8% {t('vsYesterday')}</Text>
        </View>
        <View style={styles.adminStatCard}>
          <Text style={styles.adminStatValue}>1,248</Text>
          <Text style={[styles.adminStatLabel, isRTL && styles.rtlText]}>{t('totalCustomers')}</Text>
          <Text style={[styles.adminStatChange, isRTL && styles.rtlText]}>+24 {t('thisWeek')}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionCard}>
            <User size={24} color={Colors.secondary} />
            <Text style={styles.quickActionText}>Manage Barbers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <Calendar size={24} color={Colors.secondary} />
            <Text style={styles.quickActionText}>View Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <BarChart3 size={24} color={Colors.secondary} />
            <Text style={styles.quickActionText}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <Settings size={24} color={Colors.secondary} />
            <Text style={styles.quickActionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (userRole) {
      case 'admin':
        return renderAdminDashboard();
      case 'barber':
        return renderBarberDashboard();
      default:
        return renderCustomerHome();
    }
  };

  return (
    <LinearGradient colors={Colors.blackGradient} style={styles.container}>
      {renderContent()}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: Fonts.sizes.md,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  userName: {
    fontSize: Fonts.sizes.xxl,
    color: Colors.text,
    fontWeight: 'bold',
    marginTop: 4,
  },
  subtitle: {
    fontSize: Fonts.sizes.md,
    color: Colors.textMuted,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: Fonts.sizes.md,
    color: Colors.text,
  },
  filterButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  serviceChip: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  serviceChipActive: {
    backgroundColor: Colors.secondary,
  },
  serviceChipText: {
    color: Colors.text,
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
  },
  serviceChipTextActive: {
    color: Colors.primary,
  },
  barbersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  barberCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 16,
  },
  barberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  barberInfo: {
    flex: 1,
  },
  barberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  barberName: {
    fontSize: Fonts.sizes.lg,
    color: Colors.text,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: Fonts.sizes.sm,
    color: Colors.text,
    fontWeight: '600',
  },
  reviews: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  barberDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  distance: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  price: {
    fontSize: Fonts.sizes.sm,
    color: Colors.secondary,
    fontWeight: '600',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  specialtyTag: {
    backgroundColor: Colors.secondaryOpacity,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  specialtyText: {
    fontSize: Fonts.sizes.xs,
    color: Colors.secondary,
    fontWeight: '600',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  availabilityText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Fonts.sizes.xxl,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  appointmentCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  appointmentHeader: {
    marginBottom: 12,
  },
  appointmentTime: {
    fontSize: Fonts.sizes.xl,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  appointmentService: {
    fontSize: Fonts.sizes.md,
    color: Colors.text,
    marginTop: 4,
  },
  appointmentClient: {
    marginBottom: 16,
  },
  clientName: {
    fontSize: Fonts.sizes.lg,
    color: Colors.text,
    fontWeight: '600',
  },
  appointmentDuration: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
    marginTop: 4,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.secondary,
  },
  actionButtonText: {
    fontSize: Fonts.sizes.md,
    color: Colors.text,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: Colors.primary,
  },
  adminStatsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  adminStatCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  adminStatValue: {
    fontSize: Fonts.sizes.xxl,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  adminStatLabel: {
    fontSize: Fonts.sizes.md,
    color: Colors.text,
    marginTop: 4,
  },
  adminStatChange: {
    fontSize: Fonts.sizes.sm,
    color: Colors.success,
    marginTop: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    gap: 8,
  },
  quickActionText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});