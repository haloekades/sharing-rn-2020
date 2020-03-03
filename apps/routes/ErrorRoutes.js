/** @format */

import { createStackNavigator } from 'react-navigation-stack';
import { ErrorHandling, NoData, NoInternet, NoMessages, Something } from "../screens";

export const ErrorNav = createStackNavigator({
    ErrorHandling: {
        screen: ErrorHandling,
        navigationOptions: ({ navigation }) => ({ header: null }),
    },
    NoData: {
        screen: NoData,
        navigationOptions: ({ navigation }) => ({ header: null }),
    },
    NoInternet: {
        screen: NoInternet,
        navigationOptions: ({ navigation }) => ({ header: null }),
    },
    NoMessages: {
        screen: NoMessages,
        navigationOptions: ({ navigation }) => ({ header: null }),
    },
    Something: {
        screen: Something,
        navigationOptions: ({ navigation }) => ({ header: null }),
    },
})