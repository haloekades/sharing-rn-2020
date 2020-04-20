import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleProvider, Root } from "native-base";
import { Splash, LoginForm} from "./apps/screens";
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
          </StackApp.Navigator>
        </NavigationContainer>
      </Root>
    </StyleProvider>
  );
}

export default App;