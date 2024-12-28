import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import { Alert, BackHandler, Text, View } from 'react-native'

export default function Home (){

  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    },[]),
  );

  
    return (
      <View>
        <Text>home </Text>
      </View>
    )
  }

