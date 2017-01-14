import {Scene, Router} from 'react-native-router-flux';
import TabBar from './components/TabBar';
import CommentPage from './containers/CommentPage';
import UserProfile from './containers/UserProfile';
import AddReply from './containers/AddReply';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import colors from './utils/colors';
import React from 'react';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const Root = () => (
  <Provider store={store}>
    <Router>
      <Scene
        key="root"
        navigationBarStyle={styles.navBarStyle.bar}
        titleStyle={styles.navBarStyle.title}
      >
        <Scene key="tabBar" hideNavBar component={TabBar} />
        <Scene key="commentPage" hideNavBar component={CommentPage} />
        <Scene key="userProfile" hideNavBar component={UserProfile} />
        <Scene key="addReply" hideNavBar component={AddReply} />
      </Scene>
    </Router>
  </Provider>
);

const styles = {
  navBarStyle: {
    bar: {
      backgroundColor: colors.primary1
    },
    title: {
      color: 'white',
      fontWeight: 'bold'
    }
  }
};

export default Root;
