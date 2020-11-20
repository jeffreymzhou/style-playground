import * as React from 'react';
import * as Progress from 'react-native-progress';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useNavigation } from '@react-navigation/native';
// import { AntDesign } from '@expo/vector-icons'
// import { MaterialIcons } from '@expo/vector-icons'
// import { Feather } from '@expo/vector-icons'
import { Feather, FontAwesome5 } from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default class WeekTrend extends React.Component {
  displayTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hours = (h < 10 ? '0' : '') + h;
    const minutes = (m < 10 ? '0' : '') + m;
    const secs = (s < 10 ? '0' : '') + s;
    return (hours > 0 ? hours + ':' : '') + minutes + ':' + secs;
  }
  state = {
    paused: true,
    restart: true,
    duration: 100,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => {
              Haptics.impactAsync();
              this.props.navigation.navigate('TaskList');
            }}
          >
            <Feather style={styles.backButton} name='chevron-left' />
          </TouchableOpacity>
          <Text style={styles.status}>Doing</Text>
          <Text style={styles.taskTitle}>Stats hw</Text>
        </View>
        {/* <View style={styles.timerContainer}>
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
                {this.displayTime(remainingTime)}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View> */}
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
    // backgroundColor: '#ecf0f1',
    width: '90%',
    paddingBottom: 30,
  },
  progressBarContainer: {
    flex: 0.5,
    // backgroundColor: 'grey',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  progressBarRow: {
    // flex: 1,
    // borderWidth: 2,
  },
  progressBarTextRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    // borderWidth: 2,
  },
  progressBarText: {
    fontSize: 13,
    color: '#989898',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'grey',
  },
  timerContainer: {
    flex: 4,
    // backgroundColor: 'grey',
    justifyContent: 'center',
  },
  remainingTime: {
    fontSize: 35,
  },
  actionButtonContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
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
    // backgroundColor: 'black',
    width: '30%',
    height: '50%',
  },
});
