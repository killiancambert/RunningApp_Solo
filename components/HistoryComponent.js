import * as React from 'react'
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native'
import firebase, { firestore } from 'firebase'

// const runs = firebase.firestore().collection("runs")

export default class HistoryComponent extends React.Component {

  state = {
    data: [],
    uid: ''
  }

  // componentDidMount() {
  //   const { currentUser } = firebase.auth()
  //   this.setState({ uid: currentUser.uid })
  //   let runsList = []
  //   runs
  //     .get()
  //     .then(snap => {
  //       snap.docs.map(doc => {
  //         let start = new Date(doc.data().start.)
  //       })
  //     })
  // }

  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.container}>
          <Text style={styles.date}>18:05:2020</Text>
          <Text style={styles.runTime}>56:47</Text>
          <Text style={styles.distance}>8.6km</Text>
        </View>
        <Image source={require("../assets/splash.png")} style={styles.img} />
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%'
  },
  container: {
    flex: 1, 
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  date: {
    margin: 10,
    fontSize: 20
  },
  runTime: {
    margin: 10,
    fontSize: 20
  },
  distance: {
    margin: 10,
    fontSize: 20
  },
  img: {
    height: 100,
    width: 100
  }
})