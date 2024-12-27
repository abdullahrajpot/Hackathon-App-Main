import React from 'react'
import { Text, View } from 'react-native'
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import Home from '../screens/Frontend/Home';
import Cart from '../screens/Frontend/Cart';
import Shop from '../screens/Frontend/Shop';
import {
    NavigationContainer,
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import Profile from '../screens/Frontend/Profile';


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
                    <Stack.Screen name='Profile' component={Profile} />
                    <Stack.Screen name='Cart' component={Cart} />
                    <Stack.Screen name='Shop' component={Shop} />
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
            <Drawer.Screen name='Home' component={StackNav} />
        </Drawer.Navigator>
    )
}

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <DrawerNav />
        </NavigationContainer>
    )
}

