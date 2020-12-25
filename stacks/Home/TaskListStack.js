import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import theme from '@/styles/theme.style.js';

// components, screens, & stacks
import AllTasks from '@/screens/Home/AllTasks.js';
import TaskDetails from '@/screens/Home/TaskDetails.js';

/*
The TaskListStack provides a navigator for the task list, allowing
users to tab between the task list and task details screens

Figma reference no: 9, 11
*/

function TaskListStack() {
  const TaskList = createStackNavigator();
  return (
    <TaskList.Navigator
      initialRouteName={'TaskList'}
      headerMode={'none'}
    >
      <TaskList.Screen name="AllTasks" component={AllTasks} />
      <TaskList.Screen name="TaskDetails" component={TaskDetails} />
    </TaskList.Navigator>
  )
}

export default TaskListStack;
