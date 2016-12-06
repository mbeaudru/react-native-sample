import React from 'react';
import { View, Text } from 'react-native';

class CommentPage extends React.Component {

  render() {
    return (
      <View>
        <Text>
          {this.props.comment.description}
          {this.props.comment.author.username}
        </Text>
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

export default CommentPage;
