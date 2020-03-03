/** @format */

// import { createStackNavigator } from 'react-navigation-stack';
import { LoginForm, RegisterForm, RegisterConfirm, FPasswordForm, FPasswordConfirm } from "../screens";

import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from '@react-navigation/compat';

export const AuthNav = createCompatNavigatorFactory(createStackNavigator)({
    Login: {
        screen: LoginForm,
        navigationOptions: { headerShown: false }
    },
    RegisterForm: {
        screen: RegisterForm,
        navigationOptions: { headerShown: false }
    },
    RegisterConfirm: {
        screen: RegisterConfirm,
        navigationOptions: { headerShown: false }
    },
    FPasswordForm: {
        screen: FPasswordForm,
        navigationOptions: { headerShown: false }
    },
    FPasswordConfirm: {
        screen: FPasswordConfirm,
        navigationOptions: { headerShown: false }
    }
}, {
    initialRouteName: 'Login',
})

