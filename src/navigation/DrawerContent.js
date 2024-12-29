

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthContext, logoutUser } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const DrawerList = [
  { icon: 'home-outline', label: 'Home', navigateTo: 'Home' },
  { icon: 'account-multiple', label: 'Profile', navigateTo: 'Profile' },
  { icon: 'plus', label: 'Add Event', navigateTo: 'AddItems' },
  { icon: 'bookshelf', label: 'Events', navigateTo: 'Events' },
];

const DrawerLayout = ({ icon, label, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.drawerItemContainer}
      activeOpacity={0.6}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <View style={styles.drawerItem}>
        <Icon name={icon} color="#fff" size={24} />
        <Text style={styles.drawerLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DrawerItems = () => {
  return DrawerList.map((el, i) => {
    return (
      <DrawerLayout key={i} icon={el.icon} label={el.label} navigateTo={el.navigateTo} />
    );
  });
};

function DrawerContent(props) {
  const navigation = useNavigation();
  const { user, dispatch } = useAuthContext();

  function signOut() {
    logoutUser(dispatch);
    navigation.navigate('LoginUser');
    Toast.show({
      type: 'error',
      text2: 'User logged out successfully',
      visibilityTime: 5000,
    });
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <View style={styles.userInfo}>
                <Avatar.Image
                  source={{
                    uri: user ? user.image : 'https://randomuser.me/api/portraits/men/41.jpg',
                  }}
                  size={50}
                />
                <View style={styles.userInfoText}>
                  <Title style={styles.title}>{user?.name}</Title>
                  <Text style={styles.caption}>{user?.email}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Icon name="exit-to-app" color="#fff" size={24} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C', // Dark background color for better contrast
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
    backgroundColor: '#24243E',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: '#ccc',
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerItemContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#24243E',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerLabel: {
    marginLeft: 16,
    fontSize: 16,
    color: '#fff',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E94560',
    padding: 12,
    borderRadius: 8,
  },
  signOutText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
