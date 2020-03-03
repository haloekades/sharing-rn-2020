import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleProvider, Root, Container } from "native-base";
import { Navigator, RootStack } from "./apps/routes";
import { Splash, LoginForm, RegisterForm, RegisterConfirm, FPasswordForm, FPasswordConfirm  } from "./apps/screens";
// import { AuthNav } from "./apps/routes/AuthRoutes";
import { MainApp } from "./apps/routes/MainAppRoutes";
import getTheme from './apps/theme/components';
import color from './apps/theme/variables/myColor';

const Stack = createStackNavigator();

function AuthNav() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="FPasswordForm" component={FPasswordForm} />
    </Stack.Navigator>
  )
}

// Login: {
//   screen: LoginForm,
//   navigationOptions: { headerShown: false }
// },
// RegisterForm: {
//   screen: RegisterForm,
//   navigationOptions: { headerShown: false }
// },
// RegisterConfirm: {
//   screen: RegisterConfirm,
//   navigationOptions: { headerShown: false }
// },
// FPasswordForm: {
//   screen: FPasswordForm,
//   navigationOptions: { headerShown: false }
// },
// FPasswordConfirm: {
//   screen: FPasswordConfirm,
//   navigationOptions: { headerShown: false }
// }
// }, {
// initialRouteName: 'Login',
// })

function App() {
  return (
    <StyleProvider style={getTheme(color)}>
      <Root>
        <NavigationContainer>
          {/* <RootStack /> */}

          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Auth" component={AuthNav} />
            <Stack.Screen name="MainApp" component={MainApp} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </StyleProvider>
  );
}

export default App;