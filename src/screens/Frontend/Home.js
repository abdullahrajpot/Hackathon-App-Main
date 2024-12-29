



import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AddEvent from './AddEvent';
import Events from './Events';

export default function Home() {
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
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
 source={require('../../assets/Images/main.jpg')}      
   style={styles.banner}
        resizeMode="cover"
      />
      <Text style={styles.welcome}>Hello, User!</Text>
      <Text style={styles.title}>Welcome to EventX!</Text>
      <Text style={styles.subtitle}>Your ultimate solution for seamless event management. Create, manage, and track your events effortlessly.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={{AddEvent}}>Create New Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]} onPress={'Events'}>Explore Events</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 20,
    color: '#666',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#24243E',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#24243E',
  },
  secondaryButtonText: {
    color: '#24243E',
  },
});
