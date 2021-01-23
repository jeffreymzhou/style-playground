import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import theme from '@/styles/theme.style.js';

// components, screens, & stacks
import TaskTimer from '@/screens/FocusBlock/TaskTimer.js';
import FocusBlockTaskList from '@/screens/FocusBlock/FocusBlockTaskList.js';
import FocusBlockHeader from '@/components/Headers/FocusBlockHeader.js';

/*
The DoFocusBlockStack provides the view for when the focus block is 
in progress, including:
- Focus Block to-do list
- Task-specific timers


Figma reference no: 5, 6, 7, 8
*/

function DoFocusBlockStack() {
  const DoFocusBlock = createStackNavigator();
  return (
    <DoFocusBlock.Navigator
    initialRouteName={'FocusBlockTaskList'}
    headerMode={'float'}
    screenOptions={{
      title: 'Header',
      cardStyle: { backgroundColor: theme.BACKGROUND_COLOR },
      headerStyle: {
        height: 50,
        width: '100%',
        paddingTop: 10,
        backgroundColor: theme.BACKGROUND_COLOR,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      headerShown: true,
      header: () => FocusBlockHeader()
    }}
    >
      <DoFocusBlock.Screen name="TaskTimer" component={TaskTimer} />
      <DoFocusBlock.Screen name="FocusBlockTaskList" component={FocusBlockTaskList} />
    </DoFocusBlock.Navigator>
  )
}

export default DoFocusBlockStack;
