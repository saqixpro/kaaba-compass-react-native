import React from 'react'
import { Provider } from 'react-native-paper'
import { theme } from '../core/theme'
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Starting Screen and Login/Registration Screen.
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
} from '../screens'

//Tab Screens
import {
    MyMasjidScreen,
    QiblatCompassScreen,
    MasjidFinderScreen,
    PrayerTimesScreen,
    SettingsScreen,
} from '../screens'

import {
    MyAccountScreen,
    NotificationsScreen,
    FavoriteMasjidScreen,
    IslamicCalendarScreen,
    FeedbackScreen,
} from '../screens'


import {
    MasjidDetailScreen,
} from '../screens'

{/*
    StartScreen
    LoginScreen
    RegisterScreen
    ForgotPasswordScreen
    MainScreen
        MyMasjidScreen
        QiblatScreen
        MasjidFinderScreen
        PrayerTimesScreen
        SettingsScreen
            MyAccount
            Notifications
            FavoriteMasjid
            Location --> MasjidFinderScreen
            PrayerTimes --> PrayerTimesScreen
            IslamicCalendar
            FeedBack
*/}


const StartStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const masjidDetail = createStackNavigator()

const MainStackNavigator = () => {
    return (
        <Provider theme={theme}>
            <StartStack.Navigator
                initialRouteName='StartScreen'
                screenOptions={{ 
                    headerShown: false,
                }}
            >
                <StartStack.Screen name="StartScreen" component={StartScreen} />
                <StartStack.Screen name="LoginScreen" component={LoginScreen} />
                <StartStack.Screen name="RegisterScreen" component={RegisterScreen} />
                <StartStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <StartStack.Screen name="MyMasjidMainScreen" component={MyMasjidTab} />
            </StartStack.Navigator>
        </Provider>
    )
}


const MyMasjidTab = () => {
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                switch(route.name) {
                    case 'MyMasjid':
                        iconName = focused
                        ? 'mosque' : 'mosque';
                        break;

                    case 'QiblatCompass':
                        iconName = focused
                        ? 'compass' : 'compass';
                        break;

                    case 'MasjidFinder':
                        iconName = focused
                        ? 'search' : 'search';
                        break;

                    case 'PrayerTimes':
                        iconName = focused
                        ? 'clock' : 'clock';
                        break;
                    
                    case 'Settings':
                        iconName = focused
                        ? 'wrench' : 'wrench';
                        break;
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />

                },
            })}
            tabBarOptions={{
                labelPosition: 'below-icon',
                activeBackgroundColor: '#222222',
                inactiveBackgroundColor: '#222222',
                inactiveTintColor: '#FFFFFF',
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen name="MyMasjid" component={MyMasjidScreen}/>
            <Tab.Screen name="QiblatCompass" component={QiblatCompassScreen}/>
            <Tab.Screen name="MasjidFinder" component={MasjidFinderScreen}/>
            <Tab.Screen name="PrayerTimes" component={PrayerTimesScreen}/>
            <Tab.Screen name="Settings" component={SettingsStackNavigator} options={{ tabBarVisible: false }} />
        </Tab.Navigator>
    )
}

const SettingsStackNavigator = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="MyAccount" component={MyAccountScreen} />
            <SettingsStack.Screen name="Notifications" component={NotificationsScreen} />
            <SettingsStack.Screen name="FavoriteMasjid" component={FavoriteMasjidScreen} />
            <SettingsStack.Screen name="Location" component={MasjidFinderScreen} />
            <SettingsStack.Screen name="IslamicCalendar" component={IslamicCalendarScreen} />
            <SettingsStack.Screen name="Feedback" component={FeedbackScreen} />
        </SettingsStack.Navigator>
    )
}

const MasjidDetail = () => {
    return (
        <masjidDetail.Navigator>
            <masjidDetail.Screen name="MasjidDetail" component={MasjidDetailScreen}/>
        </masjidDetail.Navigator>
    )
}


export default MyMasjidTab