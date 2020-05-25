import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './routes/AppNavigator';
import * as firebase from 'firebase';
import "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  projectId: "runningappsolo",
  apiKey: "AIzaSyBG_EjMdOH0X2BBslyTC7jAWI1tTqhyVSg",
  authDomain: "runningappsolo.firebaseapp.com",
  databaseURL: "https://runningappsolo.firebaseio.com",
  storageBucket: "runningappsolo.appspot.com",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();

export default function App() {
  return (
    <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
