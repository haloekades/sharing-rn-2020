import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import { StyleProvider, Root, Container } from "native-base";
import { Navigator, RootStack } from "./apps/routes";
import getTheme from './apps/theme/components';
import color from './apps/theme/variables/myColor';

// const Stack = createStackNavigator();

function App() {
  return (
    <StyleProvider style={getTheme(color)}>
      <Root>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Root>
    </StyleProvider>
  );
}

export default App;