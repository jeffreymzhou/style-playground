import * as React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import DateSelector from '@/components/Selectors/DateSelector.js';
import DurationSelector from '@/components/Selectors/DurationSelector.js';
import commonStyle from '@/styles/common.style.js';
import theme from '@/styles/theme.style.js';

import TimeParser from '@/utils/TimeParser';
import ProgressBar from '@/components/Shared/ProgressBar.js';

import { Task } from '@/storage/data_schema/Task';

export default class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task
    };
  }

  saveButton() {
    return (
      <View
        style={{
          padding: 20,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={() => this.saveTask()}
          activeOpacity={0.5}
          style={commonStyle.solidButton}
        >
          <Text style={commonStyle.solidButtonText}>save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  titleArea() {
      return (
        <View>
            <Text >Task Title</Text>
            <Text >Due date</Text>
            <ProgressBar />
        </View>
      )
  }

  render() {
    return (
        <View style={{
          height: '100%',
          width: '100%',
          borderTopWidth: 1,
          borderColor: '#DFDFDF',
          backgroundColor: theme.BACKGROUND_COLOR,
        }}>
          {this.titleArea()}
          {this.trend()}
          {this.actionButtons()}
        </View>
    );
  }
}

