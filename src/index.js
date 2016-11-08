import {Scene, Router} from 'react-native-router-flux';
import Home from './components/Home';
import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { navBarStyle } from './utils/styles';
import React from 'react';

const store = createStore(reducers);

const Root = () => (
  <Provider store={store}>
    <Router>
      <Scene
        key="root"
        navigationBarStyle={navBarStyle.bar}
        titleStyle={navBarStyle.title}
      >
        <Scene key="home" hideNavBar component={Home} />
      </Scene>
    </Router>
  </Provider>
);

export default Root;
