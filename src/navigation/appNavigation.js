import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import Home from '../screens/Frontend/Home';
import AddItems from '../screens/Frontend/AddEvent';
import Shop from '../screens/Frontend/Shop';
import {
    NavigationContainer,
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import UpdateProfile from '../screens/Frontend/Profile/UpdateProfile';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StackNav = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen
                    options={
                        
                        {
                            statusBarColor: 'blue',
                            headerStyle: {
                                backgroundColor: 'blue'
                            },
                            headerTintColor: 'white',
                            headerTitleAlign: 'center',
                            headerLeft: () => {
                                return (
                                    <Icon
                                        name="menu"
                                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                                        size={30}
                                        color="#fff"
                                    />
                                );
                            },
                        }
                    }
                    name='Home' component={Home} />
                    <Stack.Screen name='Profile' component={UpdateProfile} />
                    <Stack.Screen name='AddItems' component={AddItems} />
                    <Stack.Screen name='Shop' component={Shop} />
                    <Stack.Screen options={{headerShown:false}} name='LoginUser' component={LoginNav} />

            </Stack.Group>
        </Stack.Navigator>
    )
}


const DrawerNav = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
                headerShown:false,
            }}>
            <Drawer.Screen name='Home1' component={StackNav} />
        </Drawer.Navigator>
    )
}


const LoginNav = ()=>{
    const Stack = createNativeStackNavigator();

    return(
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={DrawerNav} />
    </Stack.Navigator>
)}

export default function AppNavigation() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [userType, setuserType] = useState(false);
    async function getData() {
      const data = await AsyncStorage.getItem('isLoggedIn');
    //   const userType1 = await AsyncStorage.getItem('userType');
      console.log(data, 'at app.jsx');
      setIsLoggedIn(data);
    //   setuserType(userType1);
    }
  
    useEffect(() => {
      getData();
      setTimeout(() => {
      }, 900);
    }, [isLoggedIn]);

    


    return (
        <NavigationContainer>

           {isLoggedIn? <DrawerNav/> : <LoginNav/>}
            {/* <DrawerNav /> */}
            
        </NavigationContainer>
    )
}

