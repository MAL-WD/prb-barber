import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { 
  Settings, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Star, 
  Calendar, 
  DollarSign, 
  Users, 
  Edit3 as Edit, // Changed from CreditCard as Edit
  Shield, 
  Moon, 
  Globe 
} from 'lucide-react-native';
export default function ProfileScreen() {
  const { user, userRole, logout } = useApp();
  const { t, isRTL, changeLanguage, availableLanguages, currentLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      'Are you sure you want to logout?', // Keep this in English for now
      [
        { text: 'Cancel', style: 'cancel' }, // Keep this in English for now
        {
          text: t('logout'),
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const renderCustomerProfile = () => (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('bookingsCount')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.9</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('rating')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$240</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('spent')}</Text>
        </View>
      </View>
    </>
  );

  const renderBarberProfile = () => (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>127</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('customers')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('rating')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$2,840</Text>
          <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{t('earnings')}</Text>
        </View>
      </View>
    </>
  );

  const renderAdminProfile = () => (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Barbers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1.2K</Text>
          <Text style={styles.statLabel}>Customers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$12K</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
      </View>
    </>
  );

  const getMenuItems = () => {
    const commonItems = [
      {
        icon: Bell,
        title: t('notifications'),
        subtitle: t('manageNotifications'),
        hasSwitch: true,
        switchValue: notifications,
        onSwitchChange: setNotifications,
      },
      {
        icon: Moon,
        title: t('darkMode'),
        subtitle: t('toggleTheme'),
        hasSwitch: true,
        switchValue: darkMode,
        onSwitchChange: setDarkMode,
      },
      {
        icon: Globe,
        title: t('language'),
        subtitle: availableLanguages.find(lang => lang.code === currentLanguage)?.nativeName || 'English',
        hasArrow: true,
        onPress: () => showLanguageSelector(),
      },
      {
        icon: Shield,
        title: t('privacySecurity'),
        subtitle: t('managePrivacy'),
        hasArrow: true,
      },
      {
        icon: HelpCircle,
        title: t('helpSupport'),
        subtitle: t('getHelp'),
        hasArrow: true,
      },
    ];

    const roleSpecificItems = {
      customer: [
        {
          icon: CreditCard,
          title: 'Payment Methods',
          subtitle: 'Manage your payment options',
          hasArrow: true,
        },
        {
          icon: Star,
          title: 'Rate & Review',
          subtitle: 'Rate your recent appointments',
          hasArrow: true,
        },
      ],
      barber: [
        {
          icon: Calendar,
          title: 'Working Hours',
          subtitle: 'Set your availability',
          hasArrow: true,
        },
        {
          icon: DollarSign,
          title: 'Earnings',
          subtitle: 'View your earnings history',
          hasArrow: true,
        },
      ],
      admin: [
        {
          icon: Users,
          title: 'User Management',
          subtitle: 'Manage barbers and customers',
          hasArrow: true,
        },
        {
          icon: Settings,
          title: 'System Settings',
          subtitle: 'Configure app settings',
          hasArrow: true,
        },
      ],
    };

    return [...(roleSpecificItems[userRole] || []), ...commonItems];
  };

  const showLanguageSelector = () => {
    const options = availableLanguages.map(lang => ({
      text: lang.nativeName,
      onPress: () => changeLanguage(lang.code),
    }));
    
    Alert.alert(
      t('language'),
      'Select your preferred language',
      [
        ...options,
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderMenuItem = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={[styles.menuItem, isRTL && styles.rtlMenuItem]}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <item.icon size={20} color={Colors.secondary} />
        </View>
        <View style={styles.menuItemInfo}>
          <Text style={[styles.menuItemTitle, isRTL && styles.rtlText]}>{item.title}</Text>
          <Text style={[styles.menuItemSubtitle, isRTL && styles.rtlText]}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {item.hasSwitch && (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            thumbColor={Colors.secondary}
            trackColor={{ false: Colors.border, true: Colors.secondaryOpacity }}
          />
        )}
        {item.hasArrow && (
          <ChevronRight size={20} color={Colors.textMuted} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={Colors.blackGradient} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: user?.user_metadata?.avatar_url || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
                }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>
              {user?.user_metadata?.full_name || 'User'}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <View style={styles.roleContainer}>
              <Text style={styles.roleText}>
                {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
              </Text>
            </View>
          </View>

          {userRole === 'customer' && renderCustomerProfile()}
          {userRole === 'barber' && renderBarberProfile()}
          {userRole === 'admin' && renderAdminProfile()}

          <View style={styles.menuContainer}>
            {getMenuItems().map(renderMenuItem)}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={Colors.error} />
            <Text style={[styles.logoutText, isRTL && styles.rtlText]}>{t('logout')}</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.secondary,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: Fonts.sizes.xl,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: Fonts.sizes.md,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  roleContainer: {
    backgroundColor: Colors.secondaryOpacity,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  roleText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.secondary,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Fonts.sizes.xl,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
    marginTop: 4,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: Colors.secondaryOpacity,
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: Fonts.sizes.md,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textMuted,
  },
  menuItemRight: {
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 40,
    gap: 8,
  },
  logoutText: {
    fontSize: Fonts.sizes.md,
    color: Colors.error,
    fontWeight: '600',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlMenuItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
});