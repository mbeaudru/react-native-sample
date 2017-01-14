import React from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import ActionButton from './ActionButton';
import colors from '../utils/colors';
import _ from 'lodash';

class CommentItem extends React.Component {

  render() {
    if (!this.props.comment) return <View />;
    const styles = this.getStyles(this.props.small);
    const user = _.get(this.props.comment, 'user', {});
    return (
      <View>
        <View style={styles.main.container}>
          <TouchableHighlight
            underlayColor={styles.main.container.backgroundColor}
            onPress={() => this.props.onAvatarPress(user)}
          >
            <Image
              style={styles.main.avatar}
              source={{ uri: `${user.avatar}` }}
            />
          </TouchableHighlight>
          <View style={styles.main.content}>
            <Text style={styles.main.username}>
              {user.firstName}
            </Text>
            <Text style={styles.main.description}>
              {this.props.comment.description}
            </Text>
          </View>
        </View>
        <View style={styles.main.actions}>
          <ActionButton
            textColor={styles.main.actionsColor}
            icon="star" text="Like"
            size={this.getIconSize()} hideLabel={this.props.small}
          />
          {!this.props.small &&
          <ActionButton
            textColor={styles.main.actionsColor}
            icon="reply" text="Reply"
            size={this.getIconSize()} hideLabel={this.props.small}
          />}
        </View>
      </View>
    );
  }

  static propTypes = {
    comment: React.PropTypes.shape({
      id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      user: React.PropTypes.shape({
        id: React.PropTypes.oneOfType([
          React.PropTypes.number,
          React.PropTypes.string
        ]),
        firstName: React.PropTypes.string,
        avatar: React.PropTypes.string
      }),
      description: React.PropTypes.string,
      coordinate: React.PropTypes.object
    }).isRequired,
    small: React.PropTypes.bool,
    onAvatarPress: React.PropTypes.func
  }

  static defaultProps = {
    comment: {},
    onAvatarPress: () => ({})
  }

  constructor(props) {
    super(props);

    this.getIconSize = this.getIconSize.bind(this);
  }

  getStyles(small) {
    const normalStyles = {
      container: {
        flex: 1
      },
      main: {
        container: {
          flexDirection: 'row',
          padding: 15,
          paddingBottom: 20,
          backgroundColor: colors.primary2
        },
        actions: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: colors.primary3,
          paddingBottom: 10,
          paddingTop: 10,
        },
        actionsColor: 'white',
        content: {
          flex: 1
        },
        avatar: {
          width: 55,
          height: 55,
          borderRadius: 30,
          marginRight: 15,
          marginTop: 7,
          borderWidth: 2,
          borderColor: 'white'
        },
        username: {
          fontSize: 25,
          fontWeight: 'bold',
          color: 'white'
        },
        description: {
          fontSize: 16,
          color: 'white'
        }
      }
    };

    if (!small) return normalStyles;

    const smallStyles = {
      main: {
        container: {
          backgroundColor: colors.bck1
        },
        description: {
          fontSize: 13,
          color: '#777777'
        },
        username: {
          fontSize: 18,
          color: '#666666'
        },
        actions: {
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: colors.bck2
        },
        actionsColor: '#555555',
        avatar: {
          width: 45,
          height: 45,
          borderRadius: 30,
          marginRight: 15,
          marginTop: 5,
          borderWidth: 0
        }
      }
    };

    return _.merge(normalStyles, smallStyles);
  }

  getIconSize() {
    if (this.props.small) {
      return 'small';
    }
  }

}

export default CommentItem;
