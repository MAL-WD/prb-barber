import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useApp } from '@/context/AppContext';
import { 
  Home, 
  Calendar, 
  MessageCircle, 
  User, 
  Settings, 
  BarChart3, 
  Users 
} from 'lucide-react-native';

export default function TabLayout() {
  const { userRole } = useApp();

  const getTabsForRole = () => {
    switch (userRole) {
      case 'admin':
        return [
          {
            name: 'index',
            title: 'Dashboard',
            icon: Home,
          },
          {
            name: 'manage-barbers',
            title: 'Barbers',
            icon: Users,
          },
          {
            name: 'analytics',
            title: 'Analytics',
            icon: BarChart3,
          },
          {
            name: 'profile',
            title: 'Profile',
            icon: User,
          },
        ];
      case 'barber':
        return [
          {
            name: 'index',
            title: 'Dashboard',
            icon: Home,
          },
          {
            name: 'bookings',
            title: 'Bookings',
            icon: Calendar,
          },
          {
            name: 'profile',
            title: 'Profile',
            icon: User,
          },
        ];
      default: // customer
        return [
          {
            name: 'index',
            title: 'Home',
            icon: Home,
          },
          {
            name: 'bookings',
            title: 'Bookings',
            icon: Calendar,
          },
          {
            name: 'profile',
            title: 'Profile',
            icon: User,
          },
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <tab.icon size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}