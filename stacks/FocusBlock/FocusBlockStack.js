import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// components, screens, & stacks
import CreateFocusBlock from '@/stacks/FocusBlock/CreateFocusBlockStack.js'
import DoFocusBlock from '@/stacks/FocusBlock/DoFocusBlockStack.js'

/*
The FocusBlock stack wraps around the CreateFocusBlock and DoFocusBlock stacks.
Altogether, it encompasses the entire workflow associated with a Focus Block.
Figma reference no: 3, 4, 5, 6, 7, 8
*/

function FocusBlockStack() {
  const FocusBlock = createStackNavigator();
  return (
    <FocusBlock.Navigator
      // mode="modal"
      headerMode={'float'}
      swipeEnabled={false}
    >
      <FocusBlock.Screen name="CreateFocusBlock" component={CreateFocusBlock} />
      <FocusBlock.Screen name="DoFocusBlock" component={DoFocusBlock} />
    </FocusBlock.Navigator>
  )
}

export default FocusBlockStack;
