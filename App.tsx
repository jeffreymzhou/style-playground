import * as React from 'react';
// storage
import DataCache from './storage/Storage.js';

// stacks
import RootStack from './stacks/RootStack.js';

function App() {
  global.storage = new DataCache();
  return (
      <RootStack />
  );
}

export default App;
