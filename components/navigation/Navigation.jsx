import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { color, shadow } from './../../assets/styles/Styles'
// Views
import { Home } from './../../app/(app)/Home';
import { Agenda } from './../../app/(app)/Agenda';
import { Planning } from './../../app/(app)/Planning';
import { Friends } from './../../app/(app)/Friends';

import { Settings } from './../../app/(app)/settings/Settings';


const Stack = createStackNavigator();
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

            <Tab.Screen name="Home" component={Home}></Tab.Screen>
            <Tab.Screen name="Agenda" component={Agenda}></Tab.Screen>
            <Tab.Screen name="Planning" component={Planning}></Tab.Screen>
            <Tab.Screen name="Friends" component={Friends}></Tab.Screen>
            <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
        </Tab.Navigator>
    )
}

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Navbar" component={Navbar}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
