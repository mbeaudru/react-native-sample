import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import TopBar from './TopBar';
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
          <TopBar
            onPress={this.props.onTopBarPress}
            textValue={this.props.topBarText}
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
              this.props.onSubmit(this.state.commentForm);
              this.setState({ commentForm: {} });
            }}
          />
        </View>
      </Modal>
    );
  }

  static propTypes = {
    onSubmit: React.PropTypes.func,
    onTopBarPress: React.PropTypes.func,
    visible: React.PropTypes.bool,
    topBarText: React.PropTypes.string
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

const styles = StyleSheet.create({
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
});

export default AddCommentModal;
