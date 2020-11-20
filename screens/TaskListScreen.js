import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
// import { useNavigation } from '@react-navigation/native';
// components

import TaskCard3 from '../components/TaskCard/TaskCard3.js';
// import Animated from 'react-native-reanimated';

import commonStyle from '../styles/common.style.js';
import theme from '../styles/theme.style';

export default class TaskListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
    };
  }

  navigateOnPress() {
    this.props.navigation.navigate('CurrentTask');
  }

  taskCardGenerator() {
    var tasks = [];
    for (var i = 0; i < 1; i++) {
      tasks.push(
        <TaskCard3
          status={'done'}
          onPress={() => {
            this.navigateOnPress();
          }}
        />
      );
    }
    for (var i = 0; i < 1; i++) {
      tasks.push(
        <TaskCard3
          status={'paused'}
          onPress={() => {
            this.navigateOnPress();
          }}
        />
      );
    }
    for (var i = 0; i < 2; i++) {
      tasks.push(
        <TaskCard3
          status={'confirmProgress'}
          onPress={() => {
            this.navigateOnPress();
          }}
        />
      );
    }
    for (var i = 0; i < 1; i++) {
      tasks.push(
        <TaskCard3
          status={'doing'}
          onPress={() => {
            this.navigateOnPress();
          }}
        />
      );
    }
    for (var i = 0; i < 3; i++) {
      tasks.push(
        <TaskCard3
          status={'upcoming'}
          onPress={() => {
            this.navigateOnPress();
          }}
        />
      );
    }
    return tasks;
  }

  render() {
    
    return (
      <View style={{ backgroundColor: theme.BACKGROUND_COLOR }}>
        <ScrollView contentContainerStyle={commonStyle.screenContainerStyle}>
          <View
            style={{
              width: '95%',
              flexDirection: 'column',
              backgroundColor: commonStyle.BACKGROUND_COLOR,
            }}
          >
            {this.taskCardGenerator()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
