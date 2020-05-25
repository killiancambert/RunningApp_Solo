import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native';

import HistoryComponent from '../components/HistoryComponent'

export default function History() {
  return (
    <ScrollView style={styles.container}>
      <HistoryComponent />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})