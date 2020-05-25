import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'firebase'

export default class Login extends React.Component {
  state = {
    email: '', 
    password: '',
    username: '',
    errorMessage: null
  }

  handleLogin = () => {
    const { email, password, username } = this.state
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate('MainNavigator'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Login
        </Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.button}>
          <Button title="Login" onPress={this.handleLogin} color='#58B18E' />
        </View>
        <View style={styles.button}>
          <Button
          title="Don't have an account ? Sign up here !"
          onPress={() => this.props.navigation.navigate('SignUp')}
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
    backgroundColor: '#ffffff',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    fontSize: 35
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#BBC1C3',
    borderBottomWidth: 1,
    marginTop: 30
  },
  button: {
    width: '50%',
    marginTop: 40,
    textAlign: 'center'
  }
})