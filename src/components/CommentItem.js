import React from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import ActionButton from './ActionButton';
import colors from '../utils/colors';
import _ from 'lodash';

class CommentItem extends React.Component {

  render() {
    if (!this.props.title) return <View />;
    const styles = this.getStyles(this.props.small);
    return (
      <View>
        <View style={styles.main.container}>
          <TouchableHighlight
            underlayColor={styles.main.container.backgroundColor}
            onPress={this.props.onAvatarPress}
          >
            <Image
              style={styles.main.avatar}
              source={{ uri: `${this.props.avatar}` }}
            />
          </TouchableHighlight>
          <View style={styles.main.content}>
            <Text style={styles.main.username}>
              {this.props.title}
            </Text>
            <Text style={styles.main.description}>
              {this.props.description}
            </Text>
          </View>
        </View>
        <View style={styles.main.actions}>
          <ActionButton
            textColor={this.getLikeBtnColor(this.props.liked, styles)}
            backgroundColor={styles.main.actions.backgroundColor}
            icon="star" text={this.getLikeBtnText(this.props.liked)}
            size={this.getIconSize()} hideLabel={this.props.small}
            onPress={this.props.onLikePress}
          />
          {!this.props.small &&
          <ActionButton
            textColor={styles.main.actionsColor}
            backgroundColor={styles.main.actions.backgroundColor}
            icon="reply" text="Reply"
            size={this.getIconSize()} hideLabel={this.props.small}
          />}
        </View>
      </View>
    );
  }

  static propTypes = {
    avatar: React.PropTypes.string,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    liked: React.PropTypes.bool,
    small: React.PropTypes.bool,
    onAvatarPress: React.PropTypes.func,
    onLikePress: React.PropTypes.func
  }

  static defaultProps = {
    comment: {},
    onAvatarPress: () => ({})
  }

  constructor(props) {
    super(props);

    this.getIconSize = this.getIconSize.bind(this);
  }

  getLikeBtnColor(liked, styles) {
    if (!liked) return styles.main.actionsColor;
    return '#fbef49';
  }

  getLikeBtnText(liked) {
    if (!liked) return 'Like';
    return 'Liked';
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
