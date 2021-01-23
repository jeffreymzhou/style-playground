import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Feather, } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import TimeParser from '@/utils/TimeParser.js';

export default class TaskTimer extends React.Component {
  state = {
    paused: true,
    restart: true,
    duration: 100,
  };
  render() {
    return (
      <View style={styles.container}>

        {/* title  */}
        <View style={styles.titleContainer}>

          {/* back button */}
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => {
              Haptics.impactAsync();
              this.props.navigation.navigate('FocusBlockTaskList');
            }}
          >
            <Feather style={styles.backButton} name='chevron-left' />
          </TouchableOpacity>

          <Text style={styles.status}>Doing</Text>
          <Text style={styles.taskTitle}>Stats hw</Text>
        </View>

        {/* timer circle  */}
        <View style={styles.timerContainer}>
          <CountdownCircleTimer
            isPlaying={!this.state.paused}
            duration={this.state.duration}
            colors={'#8696D2'}
            strokeWidth={7}
            size={180}
            key={this.state.restart}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text
                style={{ ...styles.remainingTime, color: animatedColor }}
              >
                {TimeParser.displayTime(remainingTime)}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>

        {/* buttons: resume, extend, finish */}
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ paused: !this.state.paused });
            }}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>
              {this.state.paused ? 'resume' : 'pause'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ duration: this.state.duration + 600 });
              this.setState({ restart: !this.state.restart });
            }}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>extend 10 mins</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ paused: !this.state.paused });
            }}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>finish early</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingBottom: 30
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  timerContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  remainingTime: {
    fontSize: 35,
  },
  actionButtonContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderColor: '#8696D2',
    height: '30%',
  },
  actionButtonText: {
    fontSize: 20,
    color: '#8696D2',
  },
  status: {
    fontSize: 30,
    color: '#8696D2',
  },
  taskTitle: {
    fontSize: 24,
    color: '#A9A8A8',
  },
  backButton: {
    fontSize: 40,
    color: '#8696D2',
  },
  backButtonWrapper: {
    position: 'absolute',
    left: 10,
    width: '30%',
    height: '50%',
  },
});
