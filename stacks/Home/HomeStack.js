import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// components, screens, & stacks
import Main from '@/stacks/Home/MainStack.js'
import NewTask from '@/screens/Home/NewTask.js'
import FocusBlock from '@/stacks/FocusBlock/FocusBlockStack.js'
import TopNavBar from '@/components/Headers/TopNavBar.js'

/*
The HomeStack wraps around the Main navigator to provide access
to "focus block" and "new task" modals.

Altogether, the HomeStack encompasses the following screens:
- today
- all tasks

and following modals:
- new task
- focus block

The HomeStack can be considered the home screen of the app.
Figma reference no: 1, 9, 10
*/

function HomeStack() {
  const Home = createStackNavigator();
  return (
    <Home.Navigator
      mode="modal"
      headerMode={'float'}
      swipeEnabled={false}
      screenOptions={{
        header: ({scene, navigation}) => TopNavBar({scene, navigation})
      }}
    >
      <Home.Screen name="Main" component={Main} />
      <Home.Screen name="NewTask" component={NewTask} />
      <Home.Screen name="FocusBlock" component={FocusBlock} />
    </Home.Navigator>
  )
}

export default HomeStack;
