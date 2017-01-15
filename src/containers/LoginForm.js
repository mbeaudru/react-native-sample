import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import colors from '../utils/colors';
import { registerUser, loginUser } from '../actions/users';
import { Actions } from 'react-native-router-flux';
import { v1 } from 'node-uuid';
import _ from 'lodash';

class LoginForm extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Icon name="people" size={100} color="white" />
          <Text style={styles.appTitle}>WeChat</Text>
        </View>
        <View style={styles.formSection}>
          <FormLabel labelStyle={styles.labelStyle}>
            Firstname
          </FormLabel>
          <FormInput
            value={this.state.form.firstName}
            onChangeText={value => this.updateForm('firstName', value)}
          />

          <FormLabel labelStyle={styles.labelStyle}>
            Lastname
          </FormLabel>
          <FormInput
            value={this.state.form.lastName}
            onChangeText={value => this.updateForm('lastName', value)}
          />

          <FormLabel labelStyle={styles.labelStyle}>
            Password
          </FormLabel>
          <FormInput
            secureTextEntry
            value={this.state.form.password}
            onChangeText={value => this.updateForm('password', value)}
          />

          <Button
            title="Login"
            onPress={this.handleLoginSubmit}
            buttonStyle={styles.loginSubmitBtn}
          />

          <Button
            title="Sign up"
            onPress={this.handleSignUpSubmit}
            buttonStyle={styles.signUpBtn}
          />
        </View>
      </View>
    );
  }

  static propTypes = {
    userLogged: React.PropTypes.bool,
    registerUser: React.PropTypes.func,
    loginUser: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        password: null,
        firstName: null,
        lastName: null,
      }
    };

    this.updateForm = this.updateForm.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.userLogged) {
      Actions.tabBar();
    }
  }

  handleSignUpSubmit() {
    const user = this.getUserInfos();
    this.props.registerUser(user);
  }

  handleLoginSubmit() {
    const user = this.getUserInfos();
    this.props.loginUser(user);
  }

  updateForm(field, value) {
    this.setState({ [`${field}`]: value });
  }

  getUserInfos() {
    return {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      description: '',
      avatar: 'http://i.imgur.com/Zp8RQt8.jpg',
      id: v1()
    };
  }

  onProfilePicture() {
    Actions.takePicture();
  }

}

const styles = {
  container: {
    flex: 1
  },
  headerStyle: {
    flex: 1,
    backgroundColor: colors.primary2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  formSection: {
    flex: 2
  },
  loginSubmitBtn: {
    marginTop: 15,
    backgroundColor: colors.primary2
  },
  signUpBtn: {
    marginTop: 15,
    backgroundColor: colors.secondary2
  },
  appTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
  labelStyle: {

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};

export default connect(
  ({ users }) => {
    const userLogged = _.get(users, 'currentUser.id', null) !== null;
    return { userLogged };
  },
  {
    registerUser,
    loginUser
  },
)(LoginForm);
