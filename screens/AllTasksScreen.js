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

import TaskCard from '../components/TaskCard/TaskCardPlain.js';
// import Animated from 'react-native-reanimated';

// style

import theme from '../styles/theme.style.js';
import commonStyle from '../styles/common.style';

export default class TaskListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: global.storage.getAllTasks(),
    };
  }

  componentDidMount() {
    this.updateTasks();
  }

  updateTasks() {
    this.setState({ tasks: global.storage.getAllTasks() });
  }

  navigateOnPress() {
    this.props.navigation.navigate('CurrentTask');
  }

  taskCardGenerator() {
    var taskCards = [];

    this.state.tasks.forEach((task, index) => {
      taskCards.push(
        <TaskCard
          key={index}
          task={task}
          onPress={() => {
            global.storage.deleteTask(task.taskId);
            this.setState({ tasks: global.storage.getAllTasks() });
          }}
          status={'confirmProgress'}
          // onPress={() => {
          //   this.navigateOnPress();
          // }}
        />
      );
    });
    return taskCards;
  }

  render() {
    // const navigation = useNavigation();
    return (
      <ScrollView contentContainerStyle={commonStyle.screenContainerStyle}>
        <View
          style={{
            width: '90%',
            height: '100%',
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 20,
            // backgroundColor: 'pink',
          }}
        >
          {this.taskCardGenerator()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
