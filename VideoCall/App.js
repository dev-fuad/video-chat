import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {RootNavigation} from './app/navigation';
import store from './app/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
