import * as _ from 'lodash';
import * as React from 'react';
import * as turf from '@turf/turf';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import moment from 'moment';

import Monitor from './MonitorComponent';
import Pin from './PinComponent';

const { Marker, Polyline } = MapView

type Position = {
  timestamp: number,
  coords: {
    latitude: number,
    longitude: number,
    accuracy: number,
  }
};

type RunningProps = {
  distance: number,
  latitude: number,
  longitude: number
};

type RunningState = {
  positions: Position[],
  distance: number,
  pace: number
};

const distanceBetween = (origin: Position, destination:Position) => {
  const from = turf.point([origin.coords.longitude, origin.coords.latitude]);
  const to = turf.point([destination.coords.longitude, destination.coords.latitude]);
  const options = {units: 'meters'};
  return _.round(turf.distance(from, to, options));
}

const computePace = (delta: null, previousPosition: Position, position: Position) => {
  const time = ( position.timestamp - previousPosition.timestamp )
  const pace = time / delta
  return pace
}

export default class Running extends React.Component<RunningProps, RunningState> {

  map = React.createRef()

  state = {
    positions: [],
    distance: 0
  }

  async componentDidMount() {
    const options = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 }
    this.listener = await Location.watchPositionAsync(options, this.onPositionChange)
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  onPositionChange = (position: Position) => {
    this.map.current.animateToCoordinate(position.coords, 1000)
    const { latitude, longitude } = this.props
    const lastPosition = this.state.positions.length === 0 ? { coords: { latitude, longitude }, timestamp: position.timestamp } : this.state.positions[ this.state.positions.length - 1 ]
    const delta = distanceBetween(lastPosition, position)
    const distance = this.state.distance + delta
    const pace = delta > 0 ? computePace(delta, lastPosition, position) : 0
    this.setState({ positions: [...this.state.positions, position], distance, pace })
  }

  render() {
    const { positions, distance, pace } = this.state
    const { latitude, longitude } = this.props
    const currentPosition = positions.length === 0 ? { coords: { latitude, longitude } } : positions[positions.length - 1]
    return(
      <View style={styles.container}>
        <Monitor {...{ distance, pace }}/>
        <MapView 
          ref={this.map}
          provider='google'
          initialRegion={{ 
            latitude, 
            longitude, 
            latitudeDelta: 0.001, 
            longitudeDelta: 0.01 
          }}
          style={styles.map}>
          <Marker coordinate={currentPosition.coords} anchor={{ x: 0.5, y: 0.5 }} >
            <Pin />
          </Marker>
          <Polyline coordinates={positions.map(position => position.coords)} strokeWidth={18} strokeColor="#f2b659" />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  }
})