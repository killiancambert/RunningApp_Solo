import * as React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import Running from '../components/RunningComponent'

type AppState = {
  ready: boolean,
  latitude: number,
  longitude: number
};

export default class MapComponent extends React.Component<{}, AppState> {

  state = {
    ready: false,
  }


  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync()
      this.setState({ ready: true, longitude, latitude })
    } else {
      alert("Couldn't get your location")
    }
  }

  render() {
    const {ready, latitude, longitude} = this.state
    return (
      <React.Fragment>
        <StatusBar barStyle='light-content' />
        {
          ready && (
            <Running distance={200} {...{ latitude, longitude }} />
          )
        }
        {
          !ready && (
            <View style={styles.container}>
              <ActivityIndicator size='large' color='white' />
            </View>
          )
        }
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29252b',
    alignItems: 'center',
    justifyContent: 'center'
  }
})