import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleProvider, Root } from "native-base";
import { Splash, LoginForm, CreateTask, TaskDetail, ApprovalDetail } from "./src/screens";
import getTheme from './src/theme/components';
import color from './src/theme/variables/myColor';
import { MainNav } from './src/routes/MainRoutes'

const StackApp = createStackNavigator();

console.disableYellowBox = true;

function App() {
  return (
    <StyleProvider style={getTheme(color)}>
      <Root>
        <NavigationContainer>
          <StackApp.Navigator initialRouteName="TaskDetail"
            screenOptions={{
              headerShown: false
            }}>
            <StackApp.Screen name="Splash" component={Splash} />
            <StackApp.Screen name="Login" component={LoginForm} />
            <StackApp.Screen name="MainApp" component={MainNav} />
            <StackApp.Screen name="CreateTask" component={CreateTask} />
            <StackApp.Screen name="TaskDetail" component={TaskDetail} />
            <StackApp.Screen name="ApprovalDetail" component={ApprovalDetail} />
          </StackApp.Navigator>
        </NavigationContainer>
      </Root>
    </StyleProvider>
  );
}

export default App;