import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Heart,
  Share,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function BarberProfileScreen() {
  const { barberId } = useLocalSearchParams();
  const [barber, setBarber] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadBarberProfile();
  }, [barberId]);

  const loadBarberProfile = async () => {
    // Mock data - replace with actual Supabase call
    const mockBarber = {
      id: barberId,
      name: 'Marcus Johnson',
      rating: 4.8,
      reviews: 127,
      image: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400',
      coverImage: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Professional barber with 8+ years of experience. Specializing in modern cuts, traditional styling, and precision beard work.',
      location: 'Downtown Barbershop',
      address: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      distance: '0.5 miles',
      experience: '8+ years',
      services: [
        {
          id: '1',
          name: 'Classic Haircut',
          price: 25,
          duration: '30 min',
          description: 'Traditional scissor cut with styling',
        },
        {
          id: '2',
          name: 'Beard Trim',
          price: 15,
          duration: '20 min',
          description: 'Precision beard shaping and trimming',
        },
        {
          id: '3',
          name: 'Haircut + Beard',
          price: 35,
          duration: '45 min',
          description: 'Complete grooming package',
        },
        {
          id: '4',
          name: 'Hot Towel Shave',
          price: 20,
          duration: '25 min',
          description: 'Relaxing traditional shave experience',
        },
      ],
      gallery: [
        'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=300',
      ],
      workingHours: {
        Monday: '9:00 AM - 7:00 PM',
        Tuesday: '9:00 AM - 7:00 PM',
        Wednesday: '9:00 AM - 7:00 PM',
        Thursday: '9:00 AM - 7:00 PM',
        Friday: '9:00 AM - 8:00 PM',
        Saturday: '8:00 AM - 6:00 PM',
        Sunday: 'Closed',
      },
      reviews: [
        {
          id: '1',
          user: 'John Smith',
          rating: 5,
          comment: 'Amazing haircut! Marcus really knows his craft.',
          date: '2 days ago',
        },
        {
          id: '2',
          user: 'Mike Johnson',
          rating: 5,
          comment: 'Best barber in town. Always consistent quality.',
          date: '1 week ago',
        },
      ],
    };
    setBarber(mockBarber);
  };

  const handleBookNow = () => {
    router.push({
      pathname: '/booking',
      params: { barberId, serviceId: selectedService?.id },
    });
  };

  const handleMessage = () => {
    Alert.alert('Chat', 'Chat functionality coming soon!');
  };

  if (!barber) {
    return (
      <LinearGradient colors={Colors.blackGradient} style={styles.container}>
        <SafeAreaView style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={Colors.blackGradient} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={{ uri: barber.coverImage }} style={styles.coverImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.headerOverlay}
          />
          <SafeAreaView style={styles.headerContent}>
            <View style={styles.headerTop}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color={Colors.text} />
              </TouchableOpacity>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    size={24}
                    color={isFavorite ? Colors.error : Colors.text}
                    fill={isFavorite ? Colors.error : 'none'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Share size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: barber.image }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.barberName}>{barber.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color={Colors.secondary} fill={Colors.secondary} />
                <Text style={styles.rating}>{barber.rating}</Text>
                <Text style={styles.reviews}>({barber.reviews} reviews)</Text>
              </View>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={Colors.textMuted} />
                <Text style={styles.location}>{barber.location}</Text>
                <Text style={styles.distance}>• {barber.distance}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.bio}>{barber.bio}</Text>

          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Clock size={16} color={Colors.secondary} />
              <Text style={styles.infoText}>Experience: {barber.experience}</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={16} color={Colors.secondary} />
              <Text style={styles.infoText}>{barber.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services</Text>
          {barber.services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService?.id === service.id && styles.serviceCardSelected,
              ]}
              onPress={() => setSelectedService(service)}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.serviceDetails}>
                  <Text style={styles.servicePrice}>${service.price}</Text>
                  <Text style={styles.serviceDuration}>{service.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.gallerySection}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {barber.gallery.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.hoursSection}>
          <Text style={styles.sectionTitle}>Working Hours</Text>
          <View style={styles.hoursContainer}>
            {Object.entries(barber.workingHours).map(([day, hours]) => (
              <View key={day} style={styles.hourRow}>
                <Text style={styles.dayText}>{day}</Text>
                <Text style={styles.hoursText}>{hours}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {barber.reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <View style={styles.reviewRating}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      color={Colors.secondary}
                      fill={Colors.secondary}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
          <MessageCircle size={20} color={Colors.text} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <LinearGradient colors={Colors.goldGradient} style={styles.bookButton}>
          <TouchableOpacity
            style={styles.bookButtonInner}
            onPress={handleBookNow}
          >
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Fonts.sizes.lg,
    color: Colors.text,
  },
  header: {
    height: 250,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: Fonts.sizes.xl,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
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
  bio: {
    fontSize: Fonts.sizes.md,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  quickInfo: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  servicesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceCardSelected: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondaryOpacity,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: Fonts.sizes.md,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: Fonts.sizes.md,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  serviceDuration: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  gallerySection: {
    paddingVertical: 20,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginLeft: 20,
  },
  hoursSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  hoursContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.text,
    fontWeight: '600',
  },
  hoursText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  reviewsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: Fonts.sizes.sm,
    color: Colors.text,
    fontWeight: '600',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: Fonts.sizes.xs,
    color: Colors.textMuted,
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  messageButtonText: {
    fontSize: Fonts.sizes.md,
    color: Colors.text,
    fontWeight: '600',
  },
  bookButton: {
    flex: 2,
    borderRadius: 8,
  },
  bookButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  bookButtonText: {
    fontSize: Fonts.sizes.md,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});