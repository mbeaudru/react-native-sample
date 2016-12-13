import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import CommentItem from '../components/CommentItem';
import _ from 'lodash';

class CommentPageHOC extends React.Component {

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

          {this.props.comment.replies.map((comment, key) =>
            <CommentItem key={key} comment={comment} small />
          )}

        </ScrollView>
      </View>
    );
  }

}

CommentPageHOC.propTypes = {
  comment: React.PropTypes.shape({
    id: React.PropTypes.string,
    description: React.PropTypes.string,
    replies: React.PropTypes.array
  })
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
  }
};

export default connect(
  (state, ownProps) => {
    const comment = _.get(state, ['comments', ownProps.commentId], {});
    //console.log(comment); // eslint-disable-line
    return { comment };
  },
  () => ({}),
)(CommentPageHOC);
