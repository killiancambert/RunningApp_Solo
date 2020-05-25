import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
// import ProgressBar from 'react-bootstrap/ProgressBar'
import firebase from 'firebase'

class ProfileComponent extends Component {

  state = {
    name: '',
    email: '',
    password: ''
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    firebase.firestore().collection("users").doc(currentUser.uid).get().then(doc => {
      this.setState({
        name: doc.data().username
      })
    }).catch(function(error) {
      console.log("Error ! Cannot get document:", error)
    })
  }

  logOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Text style={styles.hello}>
            Hi {this.state.name} !
        </Text>
        {/* <View> */}
          <Text style={styles.title}>Username</Text>
          <View style={styles.container}>
            <TextInput style={styles.input_text} placeholder='Username' editable={false}>
              {this.state.name}
            </TextInput>
          </View>
        {/* </View> */}
        {/* <View> */}
          <Text style={styles.title}>Email</Text>
          <View style={styles.container}>
            <TextInput style={styles.input_text} placeholder='Email' editable={false}>
              {this.props.currentUser}
            </TextInput>
          </View>
        {/* </View> */}
        {/* <View>
          <Text style={styles.title}>Runner Level</Text>
            <div style={styles.container}>
              <ProgressBar animated variant='info' now={35} />
            </div>
        </View> */}
        <View style={styles.button}>
          <Button title='Logout' onPress={this.logOut} color="#EC6060" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '20%'
  },
  hello: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 25,
    textTransform: "capitalize"
  },
  title: {
    fontSize: 25
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#BBC1C3',
    width: 250,
    margin: 30
  },
  input_text: {
    marginLeft: 10,
    padding: 10,
    fontSize: 20
  },
  button: {
    width: "90%",
    marginTop: '30%'
  }
})

export default ProfileComponent