import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// components, screens, & stacks
import SelectTasks from '@/screens/FocusBlock/SelectTasks.js'
import OrderTasks from '@/screens/FocusBlock/OrderTasks.js'

/*
The CreateFocusBlock stack contains the workflow to create a focus block, including
the following screens:
- select tasks
- order tasks

Figma reference no: 3, 4
*/

function CreateFocusBlockStack() {
  const CreateFocusBlock = createMaterialTopTabNavigator();
  return (
    <CreateFocusBlock.Navigator
      initialRouteName={'CreateFocusBlock'}
      swipeEnabled={false}
    >
      <CreateFocusBlock.Screen name="SelectTasks" component={SelectTasks} />
      <CreateFocusBlock.Screen name="OrderTasks" component={OrderTasks} />
    </CreateFocusBlock.Navigator>
  )
}

export default CreateFocusBlockStack;
