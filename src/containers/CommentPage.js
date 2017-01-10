import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import CommentItem from '../components/CommentItem';
import { fetchCommentById } from '../actions/comments';
import _ from 'lodash';

class CommentPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => Actions.pop()}>
          <View style={styles.topBar}>
            <Icon name="chevron-left" />
            <Text style={styles.topBarText}>Comments</Text>
          </View>
        </TouchableHighlight>

        <ScrollView>
          <CommentItem comment={this.props.comment} />

          {this.props.replies.map((comment, key) =>
            <CommentItem key={key} comment={comment} small />
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
