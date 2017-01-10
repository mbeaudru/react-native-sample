import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView } from 'react-native';
import CommentItem from '../components/CommentItem';
import TopBar from '../components/TopBar';
import { fetchCommentById } from '../actions/comments';
import _ from 'lodash';

class CommentPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TopBar onPress={() => Actions.pop()} textValue="Comments" />

        <ScrollView>
          <CommentItem
            comment={this.props.comment}
            onAvatarPress={userId => Actions.userProfile({ userId })}
          />

          {this.props.replies.map((comment, key) =>
            <CommentItem
              key={key}
              comment={comment}
              onAvatarPress={userId => Actions.userProfile({ userId })}
              small
            />
          )}

        </ScrollView>
      </View>
    );
  }

  static propTypes = {
    comment: React.PropTypes.shape({
      id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      description: React.PropTypes.string
    }),
    fetchCommentById: React.PropTypes.func,
    replies: React.PropTypes.arrayOf(
      React.PropTypes.object
    )
  }

  static defaultProps = {
    comment: {},
    replies: []
  }

  componentWillMount() {
    this.props.fetchCommentById(this.props.comment.id);
  }

}

const styles = {
  container: {
    flex: 1
  }
};

export default connect(
  ({ comments }, ownProps) => {
    const comment = _.get(comments, ['hashMap', ownProps.commentId], {});
    const replies = _.get(comment, 'replies', []);
    return { comment, replies };
  },
  { fetchCommentById },
)(CommentPage);
