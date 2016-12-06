import React from 'react';
import { View, Text, Image } from 'react-native';
import ActionButton from './ActionButton';
import { Icon } from 'react-native-elements';

class CommentPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Icon name="chevron-left" />
          <Text style={styles.topBarText}>Comments</Text>
        </View>
        <View style={styles.main.container}>
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
          <ActionButton icon="share" text="Share" />
          <ActionButton icon="star" text="Like" />
          <ActionButton icon="reply" text="Reply" />
        </View>
      </View>
    );
  }

}

CommentPage.propTypes = {
  comment: React.PropTypes.shape({
    id: React.PropTypes.string,
    author: React.PropTypes.shape({
      id: React.PropTypes.string,
      username: React.PropTypes.string,
      avatar: React.PropTypes.string
    }),
    description: React.PropTypes.string,
    coordinate: React.PropTypes.object
  })
};

CommentPage.defaultProps = {
  author: {}
};

const styles = {
  container: {
    flex: 1
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    height: 50,
    flexDirection: 'row',
    paddingLeft: 10
  },
  topBarText: {
    fontSize: 17,
    marginLeft: 20
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

export default CommentPage;
