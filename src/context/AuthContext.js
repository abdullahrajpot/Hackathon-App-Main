





import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

// Create Auth Context
const AuthContext = createContext();


const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: payload.user, token: payload.token };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (token && user) {
        dispatch({
          type: 'LOGIN',
          payload: { user: JSON.parse(user), token },
        });
      }
    };
    loadData();
  }, []);

  axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const loginUser = async (email, password, dispatch, navigation) => {
  try {
    // Send login request to the backend with email and password
    const response = await axios.post('http://192.168.18.34:5003/login', { email, password });

    // Check the response status for successful login
    if (response.data.status === 'ok') {
      const { data: token } = response.data;

      // Fetch user data using the token
      const userResponse = await axios.post('http://192.168.18.34:5003/userdata', { token });
      const userData = userResponse.data.data;

      // Store token and user data in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));

      // Dispatch LOGIN action to store user data in context
      dispatch({
        type: 'LOGIN',
        payload: { user: userData, token },
      });

      // Show a success message using Toast
      Toast.show({
        type: 'success',
        text2: 'User logged in successfully',
        visibilityTime: 10000,
      });

      // Navigate to the Home screen after successful login
      navigation.navigate('Home');
    } else {
      // Show an error message if credentials are invalid
      Toast.show({
        type: 'error',
        text2: 'Invalid credentials. Please try again.',
        visibilityTime: 10000,
      });
    }
  } catch (error) {
    console.error('Login error:', error);

    // Show an error message if an error occurs during login (e.g., network error)
    Toast.show({
      type: 'error',
      text2: 'An error occurred. Please try again later.',
      visibilityTime: 10000,
    });
  }
};


// Logout function
export const logoutUser = async (dispatch) => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  await AsyncStorage.setItem('isLoggedIn', 'false');
  dispatch({
    type: 'LOGOUT',
  });
};