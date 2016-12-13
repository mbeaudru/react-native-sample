import React from 'react';
import { View, Image, Text } from 'react-native';
import ActionButton from './ActionButton';
import _ from 'lodash';

class CommentItem extends React.Component {

  render() {
    if (!this.props.comment) return <View />;
    const styles = this.getStyles(this.props.small);
    return (
      <View>
        <View style={styles.main.container}>
          <CommentItem />
          <Image
            style={styles.main.avatar}
            source={{ uri: `${this.props.comment.author.avatar}` }}
          />
          <View style={styles.main.content}>
            <Text style={styles.main.username}>
              {this.props.comment.author.username}
            </Text>
            <Text style={styles.main.description}>
              {this.props.comment.description}
            </Text>
          </View>
        </View>
        <View style={styles.main.actions}>
          <ActionButton
            icon="share" text="Share"
            size={this.getIconSize()} hideLabel={this.props.small}
          />
          <ActionButton
            icon="star" text="Like"
            size={this.getIconSize()} hideLabel={this.props.small}
          />
          {!this.props.small &&
          <ActionButton
            icon="reply" text="Reply"
            size={this.getIconSize()} hideLabel={this.props.small}
          />}
        </View>
      </View>
    );
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
          backgroundColor: '#f7f7f7'
        },
        actions: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#fbfbfb',
          paddingBottom: 10,
          paddingTop: 10
        },
        content: {
          flex: 1
        },
        avatar: {
          width: 55,
          height: 55,
          borderRadius: 10,
          marginRight: 15,
          marginTop: 7
        },
        username: {
          fontSize: 25,
          fontWeight: 'bold'
        },
        description: {
          fontSize: 16
        }
      }
    };

    if (!small) return normalStyles;

    const smallStyles = {
      main: {
        description: {
          fontSize: 13
        },
        username: {
          fontSize: 18
        },
        actions: {
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#f9f9f9'
        },
        avatar: {
          width: 45,
          height: 45,
          borderRadius: 10,
          marginRight: 15,
          marginTop: 5
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

CommentItem.propTypes = {
  comment: React.PropTypes.shape({
    id: React.PropTypes.string,
    author: React.PropTypes.shape({
      id: React.PropTypes.string,
      username: React.PropTypes.string,
      avatar: React.PropTypes.string
    }),
    description: React.PropTypes.string,
    coordinate: React.PropTypes.object
  }).isRequired,
  small: React.PropTypes.bool
};

CommentItem.defaultProps = {
  comment: {}
};

export default CommentItem;
