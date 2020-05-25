import * as React from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import moment from 'moment'

type MonitorProps = {
  distance: number,
  pace: number,
};

type MonitorState = {
  duration: number
};

const formatDuration = (duration: number) => moment.utc(moment.duration(duration,"s").asMilliseconds()).format("mm:ss");

export default class Monitor extends React.Component<MonitorProps, MonitorState> {

  state = {
    duration: 0
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ duration: this.state.duration + 1 }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { distance, pace } = this.props
    const { duration } = this.state
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 72, fontWeight:'bold', color:'white', textAlign: 'center', }}>{distance}m </Text>
        <View style={styles.rows}>
          <View style={styles.row}>
            <Icon name='watch' color='white' size={28}/>
            <Text style={styles.label}>{formatDuration(pace)}</Text>
          </View>
          <View style={styles.row}>
            <Icon name='clock' color='white' size={28}/>
            <Text style={styles.label}>{formatDuration(duration)}</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 165,
    backgroundColor: '#29252b',
    justifyContent: 'center'
  },
  rows: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    color: 'white',
    marginLeft: 16,
    fontSize: 28
  }
})