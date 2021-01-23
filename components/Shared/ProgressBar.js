import * as React from 'react';
import * as Haptics from 'expo-haptics';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// helper functions
import TimeParser from '../../utils/TimeParser.js';

// styling 
import theme from '../../styles/theme.style.js';

/*
ProgressBar is a progress bar component that displays the % progress and time left
*/


function ProgressBar() {
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#E7E7E7',
            borderRadius: 5,
          }}
        >
          <View
            style={{
              width: '40%',
              height: '100%',
              borderRadius: 5,
              backgroundColor: '#8696D2',
            }}
          ></View>
        </View>
        <View style={styles.progressBarTextRow}>
          <Text style={styles.progressBarText}>46% complete</Text>
          <Text style={styles.progressBarText}>1 hr 20 m left</Text>
        </View>
      </View>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingTop: 10,
    backgroundColor: theme.BACKGROUND_COLOR
  },
  progressBarContainer: {
    width: '90%',
    height: '100%',
    alignSelf: 'center'
  },
  progressBarTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarText: {
    fontSize: 13,
    color: theme.DARK_GREY_COLOR,
  }
})