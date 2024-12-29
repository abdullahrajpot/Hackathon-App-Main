import React from 'react'
import { Text, View } from 'react-native'
import AppNavigation from './src/navigation/appNavigation'
import AuthContextProvider from './src/context/AuthContext'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function App()  {


  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: 'green',
          borderLeftWidth: 7,
          width: '90%',
          height: 70,
          borderRightColor: 'green',
          borderRightWidth: 7,
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 17,
          fontWeight: '700',
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => (
      <ErrorToast
        {...props}
        text2NumberOfLines={3}
        style={{
          borderLeftColor: 'red',
          borderLeftWidth: 7,
          width: '90%',
          height: 70,
          borderRightColor: 'red',
          borderRightWidth: 7,
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 17,
          fontWeight: '700',
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
  };
  
    return (
      <>
      <AuthContextProvider>

      <AppNavigation />
      <Toast config={toastConfig} />
      </AuthContextProvider>
      
      </>
    )
  }

