import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

class ActionButton extends React.Component {

  render() {
    return (
      <View>
        <Icon name={this.props.icon} />
        <Text>{this.props.text}</Text>
      </View>
    );
  }

  static propTypes = {
    icon: React.PropTypes.string,
    text: React.PropTypes.string
  }

}

export default ActionButton;
