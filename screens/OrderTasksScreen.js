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

import commonStyle from '../styles/common.style.js';
import theme from '../styles/theme.style.js';

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
      <View style={[{flex: 1,
        flexDirection: 'column'}, { backgroundColor: theme.BACKGROUND_COLOR }]}>
        <ScrollView contentContainerStyle={commonStyle.screenContainerStyle}>
          <View
            style={{
              width: '90%',
              height: '100%',
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
            this.props.navigation.navigate('DoFocusBlockStackScreen');
          }}
        >
          <Text style={commonStyle.solidButtonText}>finish</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
