import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'firebase'

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    errorMessage: null
  }

  handleSignUp = () => {
    const { email, password, username } = this.state
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      firebase
      .firestore()
      .collection('users')
      .doc(data.user.uid)
      .set({
        email: email,
        password: password,
        username: username
      });
      this.props.navigation.navigate('MainNavigator')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sign Up
        </Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.button}>
          <Button title="Sign Up" onPress={this.handleSignUp} color='#58B18E' />
        </View>
        <View style={styles.button}>
          <Button
          title="Already have a account ? Press here !"
          onPress={() => this.props.navigation.navigate('Login')}
          color='#f2b659'
          />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
  title: {
    fontSize: 35
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: '#BBC1C3',
    borderBottomWidth: 1,
    marginTop: 30
  },
  button: {
    marginTop: 35,
  }
})