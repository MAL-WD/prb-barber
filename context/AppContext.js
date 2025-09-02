import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useRef } from 'react';
import { supabase } from '@/lib/supabase';
import * as SecureStore from 'expo-secure-store';

const AppContext = createContext();

const initialState = {
  user: null,
  userRole: null,
  isLoading: true,
  barbers: [],
  services: [],
  bookings: [],
  notifications: [],
  currentBooking: null,
  chatMessages: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_USER_ROLE':
      return { ...state, userRole: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_BARBERS':
      return { ...state, barbers: action.payload };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_CURRENT_BOOKING':
      return { ...state, currentBooking: action.payload };
    case 'SET_CHAT_MESSAGES':
      return { ...state, chatMessages: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const isMountedRef = useRef(true);

  useEffect(() => {
    checkAuthState();
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const checkAuthState = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        if (isMountedRef.current) {
          dispatch({ type: 'SET_USER', payload: session.user });
        }
        const userRole = await SecureStore.getItemAsync('userRole');
        if (isMountedRef.current) {
          dispatch({ type: 'SET_USER_ROLE', payload: userRole });
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      if (isMountedRef.current) {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (isMountedRef.current) {
      dispatch({ type: 'SET_USER', payload: data.user });
    }
    return data;
  };

  const signup = async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    
    if (error) throw error;
    
    if (isMountedRef.current) {
      dispatch({ type: 'SET_USER', payload: data.user });
    }
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    await SecureStore.deleteItemAsync('userRole');
    if (isMountedRef.current) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const value = {
    ...state,
    dispatch,
    login,
    signup,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};