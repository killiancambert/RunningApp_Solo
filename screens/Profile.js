import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import firebase from 'firebase'
import ProfileComponent from '../components/ProfileComponent'

export default class Profile extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state

    return (
      <ScrollView style={styles.container}>
        <ProfileComponent currentUser={currentUser && currentUser.email} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});