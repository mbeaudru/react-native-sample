import React from 'react';
import { Tabs, Tab, Icon } from 'react-native-elements';
import MapScreen from '../containers/MapScreen';
import { Text, View } from 'react-native';
import colors from '../utils/colors';
import CommentsList from '../containers/CommentsList';

class TabBar extends React.Component {

  render() {
    return (
      <Tabs
        style={styles.tabBarHack}
        tabBarStyle={styles.tabBarStyle}
        tabBarShadowStyle={styles.tabBarShadowStyle}
      >
        <Tab
          selected={this.state.selectedTab === 'map'}
          onPress={() => this.setState({ selectedTab: 'map' })}
          title={this.state.selectedTab === 'map' ? 'Map' : null}
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.selectedTabTitle}
          renderIcon={() => <Icon name="map" size={26} />}
          renderSelectedIcon={() =>
            <Icon name="map" size={26} color={colors.primary2} />
          }
        >
          <View style={styles.tabChildrenContainer}>
            <MapScreen />
          </View>
        </Tab>

        <Tab
          selected={this.state.selectedTab === 'commentsList'}
          onPress={() => this.setState({ selectedTab: 'commentsList' })}
          title={this.state.selectedTab === 'commentsList' ? 'Comments' : null}
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.selectedTabTitle}
          renderIcon={() => <Icon name="chat" size={26} />}
          renderSelectedIcon={() =>
            <Icon name="chat" size={26} color={colors.primary2} />
          }
        >
          <View style={styles.tabChildrenContainer}>
            <CommentsList />
          </View>
        </Tab>

        <Tab
          selected={this.state.selectedTab === 'friends'}
          onPress={() => this.setState({ selectedTab: 'friends' })}
          title={this.state.selectedTab === 'friends' ? 'Friends' : null}
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.selectedTabTitle}
          renderIcon={() => <Icon name="people" size={26} />}
          renderSelectedIcon={() =>
            <Icon name="people" size={26} color={colors.primary2} />
          }
        >
          <View style={styles.tabChildrenContainer}>
            <Text>Empty section</Text>
          </View>
        </Tab>
      </Tabs>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'map'
    };
  }

}

const styles = {
  tabBarStyle: {
    flex: 1,
    top: 0,
  },
  tabBarShadowStyle: {
    bottom: 0,
    top: 0
  },
  tabChildrenContainer: {
    flex: 1,
    marginTop: 50
  },
  selectedTabTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: -1,
    color: colors.primary2
  },
  tabBarHack: {
    marginBottom: -50
  }
};

export default TabBar;
