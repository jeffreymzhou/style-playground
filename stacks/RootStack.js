import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import HomeStack from '@/stacks/Home/HomeStack.js';
import Settings from '@/stacks/SettingsStack.js';

// main app drawer navigator
const Root = createDrawerNavigator();

function RootStack() {
  return (
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen name='Home' component={HomeStack} />
          {/* <Root.Screen name='Settings' component={Settings} /> */}
        </Root.Navigator>
      </NavigationContainer>
  );
}

export default RootStack;
