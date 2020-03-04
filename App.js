import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import { StyleProvider, Root, Container } from "native-base";
import { Navigator, RootStack } from "./apps/routes";
import {
  Splash, LoginForm, RegisterForm, RegisterConfirm, FPasswordForm, FPasswordConfirm,
  CreateTask, ListTask, TaskDetail, ApprovalList, ApprovalDetail
} from "./apps/screens";
import { MainNav } from "./apps/routes/MainRoutes"
// import { AuthNav } from "./apps/routes/AuthRoutes";
import { MainApp } from "./apps/routes/MainAppRoutes";
import getTheme from './apps/theme/components';
import color from './apps/theme/variables/myColor';

const StackAuth = createStackNavigator();

function AuthNav() {
  return (
    <StackAuth.Navigator initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}>
      <StackAuth.Screen name="Login" component={LoginForm} />
      <StackAuth.Screen name="RegisterForm" component={RegisterForm} />
      <StackAuth.Screen name="FPasswordForm" component={FPasswordForm} />
    </StackAuth.Navigator>
  )
}
const StackMain = createStackNavigator();

function MainAppNav() {
  return (
    <StackMain.Navigator initialRouteName="MainApp"
      screenOptions={{
        headerShown: false
      }}>
      <StackMain.Screen name="MainApp" component={MainNav} />
      <StackMain.Screen name="CreateTask" component={CreateTask} />
      <StackMain.Screen name="ListTask" component={ListTask} />
      <StackMain.Screen name="TaskDetail" component={TaskDetail} />
      <StackMain.Screen name="ApprovalList" component={ApprovalList} />
      <StackMain.Screen name="ApprovalDetail" component={ApprovalDetail} />
    </StackMain.Navigator>
  )
}

// Main: {
//   screen: MainNav,
//   navigationOptions: { headerShown: false }
// },
// CreateTask: {
//   screen: CreateTask,
//   navigationOptions: { headerShown: false }
// },
// ListTask: {
//   screen: ListTask,
//   navigationOptions: { headerShown: false }
// },
// TaskDetail: {
//   screen: TaskDetail,
//   navigationOptions: { headerShown: false }
// },
// ApprovalList: {
//   screen: ApprovalList,
//   navigationOptions: { headerShown: false }
// },
// ApprovalDetail: {
//   screen: ApprovalDetail,
//   navigationOptions: { headerShown: false }
// }

const StackApp = createStackNavigator();

function App() {
  return (
    <StyleProvider style={getTheme(color)}>
      <Root>
        <NavigationContainer>
          {/* <RootStack /> */}

          <StackApp.Navigator initialRouteName="Splash"
            screenOptions={{
              headerShown: false
            }}>
            <StackApp.Screen name="Splash" component={Splash} />
            {/* <StackApp.Screen name="Auth" component={AuthNav} /> */}
            {/* <StackApp.Screen name="MainApp" component={MainAppNav} /> */}


            <StackApp.Screen name="Login" component={LoginForm} />
            <StackApp.Screen name="RegisterForm" component={RegisterForm} />
            <StackApp.Screen name="FPasswordForm" component={FPasswordForm} />

            <StackApp.Screen name="MainApp" component={MainNav} />
            <StackApp.Screen name="CreateTask" component={CreateTask} />
            <StackApp.Screen name="ListTask" component={ListTask} />
            <StackApp.Screen name="TaskDetail" component={TaskDetail} />
            <StackApp.Screen name="ApprovalList" component={ApprovalList} />
            <StackApp.Screen name="ApprovalDetail" component={ApprovalDetail} />
          </StackApp.Navigator>
        </NavigationContainer>
      </Root>
    </StyleProvider>
  );
}

export default App;