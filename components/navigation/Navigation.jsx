import React from 'react';
import { useAuth } from '../../config/auth/authContext';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { color, shadow } from './../../assets/styles/Styles'
// Views
import { Welcome } from '../../app/Welcome';
import { SignIn } from './../../app/SignIn';
import { SignUp } from './../../app/SignUp';
import { ForgotPassword } from '../../app/ForgotPassword';

import { Home } from './../../app/(app)/Home';
import { Agenda } from './../../app/(app)/Agenda';
import { Planning } from './../../app/(app)/Planning';

import { Friends } from './../../app/(app)/Friends';
import { Chat } from '../../app/(app)/friends/Chat';

import { User } from '../../app/(app)/User';
import { Settings } from './../../app/(app)/settings/Settings';
import { EditProfile, EditProfileUsername, EditProfileEmail, EditProfileDeleteAccount } from '../../app/(app)/settings/EditProfile';
import { ActivityPreferences } from '../../app/(app)/settings/ActivityPreferences';
import { Language, LanguageApp } from '../../app/(app)/settings/Language';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FriendsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function FriendsContent({navigation, route}) {

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Chat"){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else {
            navigation.setOptions({tabBarStyle: { 
                position: 'absolute',
                marginBottom: 30,
                marginHorizontal: 15,
                borderTopWidth: 0,
                borderRadius: 30,
                paddingVertical: 30,
                paddingHorizontal: 10,
                elevation: 0,
                shadowOpacity: 0,
                ... shadow.shadowNavbar,}});
        }
    }, [navigation, route]);

    return (
        <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
            <FriendsStack.Screen name="Friends" component={Friends}></FriendsStack.Screen>
            <FriendsStack.Screen name="Chat" component={Chat}></FriendsStack.Screen>
        </FriendsStack.Navigator>
    )
}

function Profile() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="User" component={User}></ProfileStack.Screen>
            <ProfileStack.Screen name="Settings" component={Settings}></ProfileStack.Screen>

            <SettingsStack.Screen name="EditProfile" component={EditProfile}></SettingsStack.Screen>
            <SettingsStack.Screen name="Username" component={EditProfileUsername}></SettingsStack.Screen>
            <SettingsStack.Screen name="Email" component={EditProfileEmail}></SettingsStack.Screen>
            <SettingsStack.Screen name="DeleteAccount" component={EditProfileDeleteAccount}></SettingsStack.Screen>
            <SettingsStack.Screen name="ActivityPreferences" component={ActivityPreferences}></SettingsStack.Screen>
            <SettingsStack.Screen name="Language" component={Language}></SettingsStack.Screen>
            <SettingsStack.Screen name="AppLanguage" component={LanguageApp}></SettingsStack.Screen>
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
                } else if (route.name === 'FriendsContent') {
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

            <Tab.Screen name="Home" component={Home}></Tab.Screen>
            <Tab.Screen name="Agenda" component={Agenda}></Tab.Screen>
            <Tab.Screen name="Planning" component={Planning}></Tab.Screen>
            <Tab.Screen name="FriendsContent" component={FriendsContent}></Tab.Screen>
            <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
        </Tab.Navigator>
    )
}

export function Navigation() {
    const { isAuthenticated } = useAuth();

    if (typeof isAuthenticated === 'undefined') {
        // Return a loading indicator or null if the authentication status is still loading
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated ? (
                <>
                    <Stack.Screen name="Navbar" component={Navbar}></Stack.Screen>
                </>
            ) : (
                <>
                    <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
                    <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
                    <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
                </>
            )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
