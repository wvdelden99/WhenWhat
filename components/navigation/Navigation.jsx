import * as React from 'react';
import useAuth from '../../config/auth/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { color, shadow } from '../../assets/styles/Styles';
// Views
import { Welcome } from '../../views/auth/Welcome';
import { SignIn } from '../../views/auth/SignIn';
import { SignUp } from '../../views/auth/SignUp';

import { Agenda } from '../../views/Agenda';
import { Friends } from '../../views/Friends';
import { Home } from './../../views/Home';
import { Planning } from './../../views/Planning';

import { User } from '../../views/User';
import { Settings } from '../../views/settings/Settings';
import { EditProfile, EditProfileUsername, EditProfileEmail, EditProfileDeleteAccount } from '../../views/settings/EditProfile'; 
import { PasswordAndSecurity, PasswordAndSecurityPassword } from '../../views/settings/PasswordAndSecurity';


import { Language } from '../../views/settings/SettingsLanguage';
import { LanguageApp } from '../../views/settings/SettingsLNAppLanguage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function Profile() {
    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}}>
            <ProfileStack.Screen name="User" component={User}></ProfileStack.Screen>
            <ProfileStack.Screen name="Settings" component={Settings}></ProfileStack.Screen>
            
            <SettingsStack.Screen name="EditProfile" component={EditProfile}></SettingsStack.Screen>
            <SettingsStack.Screen name="Username" component={EditProfileUsername}></SettingsStack.Screen>
            <SettingsStack.Screen name="Email" component={EditProfileEmail}></SettingsStack.Screen>
            <SettingsStack.Screen name="DeleteAccount" component={EditProfileDeleteAccount}></SettingsStack.Screen>
            <SettingsStack.Screen name="PasswordAndSecurity" component={PasswordAndSecurity}></SettingsStack.Screen>
            <SettingsStack.Screen name="Password" component={PasswordAndSecurityPassword}></SettingsStack.Screen>
            <SettingsStack.Screen name="Language" component={Language}></SettingsStack.Screen>
            <SettingsStack.Screen name="LanguageApp" component={LanguageApp}></SettingsStack.Screen>
        </ProfileStack.Navigator>
    )
}

function Navbar() {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    let iconComponent;

                    if (route.name === 'Home') {
                        iconComponent = require('./../../assets/static/icons/icon_home_01.png');
                    } else if (route.name === 'Agenda') {
                        iconComponent = require('./../../assets/static/icons/icon_calendar_01.png');
                    } else if (route.name === 'Planning') {
                        iconComponent = require('./../../assets/static/icons/icon_clock_01.png');
                    } else if (route.name === 'Friends') {
                        iconComponent = require('./../../assets/static/icons/icon_users_01.png');
                    } else if (route.name === 'Profile') {
                        iconComponent = require('./../../assets/static/icons/icon_user_01.png');
                    }

                    const iconColor = focused ? color.secondaryColor : color.darkColor;
                    return  <>
                                <Image source={iconComponent} className="w-6 h-6" style={{ tintColor: iconColor }} /> 
                            </>
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    marginBottom: 30,
                    marginHorizontal: 15,
                    borderTopWidth: 0,
                    borderRadius: 30,
                    paddingVertical: 30,
                    paddingHorizontal: 10,
                    elevation: 0,
                    shadowOpacity: 0,
                    ... shadow.shadowNavbar,
                }
            })}>

            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Agenda" component={Agenda} />
            <Tab.Screen name="Planning" component={Planning} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export function Navigation() {
    const {user} = useAuth();

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Navbar" component={Navbar} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
                    <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
                    <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
