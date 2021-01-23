import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// screens
import Today from '@/screens/Home/Today.js';
import TaskList from '@/stacks/Home/TaskListStack.js';

/*
MainStack provides a tab-navigator for 2 main screens: "today" and "tasks"
Figma reference no: 1, 9
*/

const Main = createMaterialTopTabNavigator();

function MainStack() {
  return (
    <Main.Navigator
      initialRouteName={'Today'}
      swipeEnabled={false}
    >
      <Main.Screen name="Today" component={Today} />
      <Main.Screen name="Tasks" component={TaskList} />
    </Main.Navigator>
  )
}

export default MainStack;
