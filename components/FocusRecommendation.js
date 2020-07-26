import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { AntDesign } from '@expo/vector-icons'
// import { MaterialIcons } from '@expo/vector-icons'
// import { Feather } from '@expo/vector-icons'
import { Feather, FontAwesome5 } from '@expo/vector-icons'

export default class FocusRecommendation extends React.Component {
  render() {
    return (
      <View style={styles.focusRecommendationContainer}>
        <View style={styles.divider}></View>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#8696D2', fontWeight: '500', fontSize: 23, lineHeight: 30}}>
            2 hours of focus
          </Text>
          <Text style={{color: '#777777'}}>
            is all you need to succeed today.
          </Text>
        </View>
        <View style={styles.divider}></View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  focusRecommendationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  divider: {
    height: 3,
    backgroundColor: '#DFE6FF',
    borderRadius: 3,
    width: '90%',
    flex: 1
  },
});