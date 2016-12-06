import React from 'react';
import { List, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native';

class CommentsList extends React.Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          {
            this.props.comments
              .map((comment, key) => {
                const { description, author } = comment;
                return (
                  <ListItem
                    key={key}
                    roundAvatar
                    avatar={author.avatar}
                    title={author.username}
                    subtitle={description}
                    onPress={() => this.props.onCommentClick(comment)}
                  />
                );
              })
          }
        </List>
      </ScrollView>
    );
  }

  static propTypes = {
    comments: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        title: React.PropTypes.string,
        description: React.PropTypes.string,
        avatar: React.PropTypes.shape({
          username: React.PropTypes.string,
          avatar: React.PropTypes.string
        })
      })
    ),
    onCommentClick: React.PropTypes.func
  }

}

const styles = {
  container: {
    marginTop: -22
  }
};

export default CommentsList;
