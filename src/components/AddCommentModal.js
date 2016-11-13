import React from 'react';
import { Modal, View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import colors from '../utils/colors';

class AddCommentModal extends React.Component {

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <View>
          <Text style={styles.headerTitle}>New comment</Text>
          <FormLabel>Title</FormLabel>
          <FormInput
            value={this.state.commentForm.title}
            onChangeText={
              (value) => this.updateCommentForm('title', value)
            }
          />
          <FormLabel>Description</FormLabel>
          <FormInput
            value={this.state.commentForm.description}
            onChangeText={
              (value) => this.updateCommentForm('description', value)
            }
          />
          <Button
            title="Create comment"
            buttonStyle={styles.submitBtn}
            onPress={() => {
              this.props.addComment(this.state.commentForm);
              this.setState({ commentForm: {} });
            }}
          />
        </View>
      </Modal>
    );
  }

  static propTypes = {
    addComment: React.PropTypes.func,
    visible: React.PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.updateCommentForm = this.updateCommentForm.bind(this);
  }

  state = {
    commentForm: {}
  };

  updateCommentForm(field, value) {
    const commentForm = Object.assign(
      {}, this.state.commentForm, { [`${field}`]: value }
    );

    this.setState({ commentForm });
  }

}

const styles = {
  submitBtn: {
    backgroundColor: colors.primary2,
    marginTop: 15
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  }
};

export default AddCommentModal;
