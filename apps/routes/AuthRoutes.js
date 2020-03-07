/** @format */

// import { createStackNavigator } from 'react-navigation-stack';
import { LoginForm} from "../screens";

import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from '@react-navigation/compat';

export const AuthNav = createCompatNavigatorFactory(createStackNavigator)({
    Login: {
        screen: LoginForm,
        navigationOptions: { headerShown: false }
    }
}, {
    initialRouteName: 'Login',
})

