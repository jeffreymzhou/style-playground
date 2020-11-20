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

import TaskCard from '../components/TaskCard/TaskCard.js';

import commonStyle from '../styles/common.style.js';
import theme from '../styles/theme.style.js';

export default class SelectTasksScreen extends React.Component {
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
      tasks.push(<TaskCard />);
    }
    return tasks;
  }

  addTask() {
    addTaskAction("ACTION NAME", param)
  }

  render() {
    return (
      <View style={{ backgroundColor: theme.BACKGROUND_COLOR, flex: 1,
        flexDirection: 'column', }}>
        <ScrollView contentContainerStyle={[ commonStyle.screenContainerStyle]}>
          <View
            style={{
              width: '90%',
              flexDirection: 'column',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {this.taskCardGenerator()}
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[commonStyle.solidButton, commonStyle.bottomButton]}
          onPress={() => {
            Haptics.impactAsync();
            this.props.navigation.navigate('page3');
          }}
        >
          <Text style={commonStyle.solidButtonText}>next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
