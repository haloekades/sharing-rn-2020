import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleProvider, Root } from "native-base";
import { Splash, LoginForm, CreateTask, ListTask, TaskDetail, ApprovalList, ApprovalDetail } from "./apps/screens";
import { MainNav } from "./apps/routes/MainRoutes"
import getTheme from './apps/theme/components';
import color from './apps/theme/variables/myColor';

const StackApp = createStackNavigator();

function App() {
  return (
    <StyleProvider style={getTheme(color)}>
      <Root>
        <NavigationContainer>
          <StackApp.Navigator initialRouteName="Splash"
            screenOptions={{
              headerShown: false
            }}>
            <StackApp.Screen name="Splash" component={Splash} />
            <StackApp.Screen name="Login" component={LoginForm} />
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