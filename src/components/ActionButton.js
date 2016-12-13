import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

class ActionButton extends React.Component {

  render() {
    const sizeStyle = this.getSize(this.props.size);
    return (
      <View>
        <Icon name={this.props.icon} size={sizeStyle.icon.size} />
        {!this.props.hideLabel &&
          <Text style={sizeStyle.text}>{this.props.text}</Text>
        }
      </View>
    );
  }

  static propTypes = {
    icon: React.PropTypes.string,
    text: React.PropTypes.string,
    size: React.PropTypes.string,
    hideLabel: React.PropTypes.bool
  }

  getSize(size) {
    const normalSize = { icon: { size: 26 }, text: { fontSize: 14 } };
    const smallSize = { icon: { size: 23 }, text: { fontSize: 12 } };
    switch (size) {
      case 'normal': return normalSize;
      case 'small': return smallSize;
      default: return normalSize;
    }
  }

}

export default ActionButton;
