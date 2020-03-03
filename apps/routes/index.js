/** @format */
import { createSwitchNavigator } from '@react-navigation/compat';
import { Splash } from "../screens";
import { AuthNav } from "./AuthRoutes";
import { MainApp } from "./MainAppRoutes";
export const RootStack = createSwitchNavigator(
  {
        Splash: {
            screen: Splash,
            navigationOptions: { headerShown: false }
        },
        Auth: {
            screen: AuthNav,
            navigationOptions: { headerShown: false }
        },
        MainApp: {
            screen: MainApp,
            navigationOptions: { headerShown: false }
        },
  }
);