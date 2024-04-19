import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { color, shadow } from '../../assets/styles/Styles';
// Views
import { Agenda } from '../../views/Agenda';
import { Friends } from '../../views/Friends';
import { Home } from './../../views/Home';
import { Planning } from './../../views/Planning';
import { Settings } from '../../views/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
                    } else if (route.name === 'Settings') {
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
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Navbar" component={Navbar} options={{title: 'Welcome'}}/>
                <Stack.Screen name="Profile" component={Planning} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
