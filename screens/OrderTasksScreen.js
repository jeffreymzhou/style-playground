import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

// components

import TaskCard2 from '../components/TaskCard/TaskCard2.js';
// import Animated from 'react-native-reanimated';

export default class OrderTasksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
    };
  }

  taskCardGenerator() {
    var tasks = [];
    for (var i = 0; i < 5; i++) {
      tasks.push(<TaskCard2 />);
    }
    return tasks;
  }

  render() {
    return (
      <View style={{ width: '95%', height: '80%', flexDirection: 'column' }}>
        {this.taskCardGenerator()}
      </View>
    );
  }
}
