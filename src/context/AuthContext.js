// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Create Auth Context
// const AuthContext = createContext();

// // Initial state for AuthContext
// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
// };

// // Reducer function to handle authentication actions
// const reducer = (state, { type, payload }) => {
//   switch (type) {
//     case 'LOGIN':
//       return { ...state, isAuthenticated: true, user: payload.user, token: payload.token };
//     case 'LOGOUT':
//       return { ...state, isAuthenticated: false, user: null, token: null };
//     default:
//       return state;
//   }
// };

// // AuthContextProvider component
// export default function AuthContextProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // Load user data from AsyncStorage if available
//   useEffect(() => {
//     const loadData = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const user = await AsyncStorage.getItem('user');
//       if (token && user) {
//         dispatch({
//           type: 'LOGIN',
//           payload: { user: JSON.parse(user), token },
//         });
//       }
//     };
//     loadData();
//   }, []);

//   // Axios request interceptor to set Authorization header
//   axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use AuthContext
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// // Function to login the user and store user data and token
// export const loginUser = async (email, password, dispatch) => {
//   try {
//     const response = await axios.post('http://192.168.18.34:5003/login', { email, password });
//     if (response.data.status === 'ok') {
//       const { data: token} = response.data;
//       // Fetch the user data from /userdata endpoint
//       const userResponse = await axios.post('http://192.168.18.34:5003/userdata', { token });
//       const userData = userResponse.data.data;

//       // Store user and token in AsyncStorage
//       await AsyncStorage.setItem('token', token);
//       await AsyncStorage.setItem('user', JSON.stringify(userData));
//       AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));


//       // Dispatch LOGIN action to store user data in the context
//       dispatch({
//         type: 'LOGIN',
//         payload: { user: userData, token },
//       });
//     } else {
//       console.error('Login failed:', response.data.data);
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//   }
// };






import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

// Create Auth Context
const AuthContext = createContext();

// Initial state for AuthContext
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Reducer function to handle authentication actions
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

// AuthContextProvider component
export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load user data from AsyncStorage if available
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

  // Axios request interceptor to set Authorization header
  axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Function to login the user and store user data and token
export const loginUser = async (email, password, dispatch) => {
  try {
    // Send login request to the backend with email and password
    const response = await axios.post('http://172.16.50.49:5003/login', { email, password });

    // Check the status in the response to determine whether the login is successful
    if (response.data.status === 'ok') {
      const { data: token } = response.data;

      // Fetch user data from /userdata endpoint
      const userResponse = await axios.post('http://172.16.50.49:5003/userdata', { token });
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

      // Show a success message with Toast
      Toast.show({
        type: 'success',
        text2: 'User logged in successfully',
        visibilityTime: 10000,
      });

      // Navigate to the Home screen after successful login
      navigation.navigate('Home');
    } else {
      // Handle invalid credentials
      Toast.show({
        type: 'error',
        text2: 'Invalid credentials. Please try again.',
        visibilityTime: 10000,
      });

    }
  } catch (error) {
    console.error('Login error:', error);

    // Show error toast in case of a server or network error
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