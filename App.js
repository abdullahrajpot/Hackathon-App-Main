import React from 'react'
import { Text, View } from 'react-native'
import AppNavigation from './src/navigation/appNavigation'
import AuthContextProvider from './src/context/AuthContext'

export default function App()  {
  
    return (
      <>
      <AuthContextProvider>

      <AppNavigation />
      </AuthContextProvider>
      
      </>
    )
  }

