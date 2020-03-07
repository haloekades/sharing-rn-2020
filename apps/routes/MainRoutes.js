/** @format */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, HistoryTask } from "../screens";
import { Icon } from 'native-base';

const Tab = createBottomTabNavigator();

export function MainNav() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon type="AntDesign" name="home" color={color} fontSize={size} style={{margin : 2}}/>
                    ),
                }}
            />
            <Tab.Screen name="History" 
            component={HistoryTask}
            options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color, size }) => (
                    <Icon type="AntDesign" name="menuunfold" color={color} fontSize={size} style={{margin : 2}}/>
                ),
            }} />
            <Tab.Screen name="Profile" 
            component={Profile} 
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Icon type="AntDesign" name="user" color={color} fontSize={size} style={{margin : 2}}/>
                ),
            }}/>
        </Tab.Navigator>
    );
}