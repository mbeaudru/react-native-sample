import React from 'react';
import { List, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native';

class CommentsList extends React.Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          {this.props.comments.map(({ title, description }, key) =>
            <ListItem
              key={key}
              title={title}
              subtitle={description}
            />
          )}
        </List>
      </ScrollView>
    );
  }

  static propTypes = {
    comments: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        title: React.PropTypes.string,
        description: React.PropTypes.string
      })
    )
  }

}

const styles = {
  container: {
    marginTop: -22
  }
};

export default CommentsList;
