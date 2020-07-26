import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
// import { AntDesign } from '@expo/vector-icons'
// import { MaterialIcons } from '@expo/vector-icons'
// import { Feather } from '@expo/vector-icons'
import {
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

// style imports
import styles from './TaskCard.component.style';
import theme from '../../styles/theme.style';

export default class TaskCard2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      selectedOrder: '',
      selectedDuration: '15 m',
      pulse: new Animated.Value(0),
    };
  }

  exampleTask = {
    id: '12091029',
    title: 'title',
    estimatedTimeRemaining: '1 hr',
    dueDate: 'due Friday',
    timeSpent: '1 hr',
    dateCreated: 'july 2, 2020',
    focusBlock: {
      status: 'done',
      timeLeft: 400, //in seconds
      timeBudgeted: 800, //in seconds
      timeSpent: 100, //in seconds
    },
  };

  componentDidMount() {
    this.pulse();
  }
  pulse() {
    this.state.pulse.setValue(0);
    Animated.timing(this.state.pulse, {
      toValue: 1,
      duration: 1600,
      easing: Easing.easeOutBack,
      useNativeDriver: true,
    }).start(() => this.pulse());
  }

  taskCircleDoingIcon() {
    const circleOpacity = this.state.pulse.interpolate({
      inputRange: [0, 0.4, 0.9, 1],
      outputRange: [0.5, 1, 1, 0.5],
    });
    return (
      <Animated.View
        style={{
          height: 15,
          width: 15,
          borderRadius: 30,
          backgroundColor: '#A6B9FF',
          alignSelf: 'center',
          position: 'absolute',
          opacity: circleOpacity,
        }}
      ></Animated.View>
    );
  }

  taskCircleIcon() {
    switch (this.props.status) {
      case 'paused':
        return <Fontisto style={styles.taskCircleIcon} name='pause' />;
      case 'done':
        return <FontAwesome5 style={styles.taskCircleIcon} name='check' />;
      case 'confirmProgress':
        return <FontAwesome5 style={styles.taskCircleIcon} name='ellipsis-h' />;
      case 'doing':
        return this.taskCircleDoingIcon();
      default:
        return [];
    }
  }

  render() {
    return (
      <Animated.View style={styles.taskCardContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.props.onPress();
          }}
          style={[
            styles.taskCard,
            {
              borderWidth: 0,
              backgroundColor:
                this.props.status === 'doing' ? theme.LIGHT_BLUE_COLOR : '',
            },
          ]}
        >
          <View style={styles.taskCardLeft}>
            <View style={[styles.taskCircle, styles[this.props.status]]}>
              {this.taskCircleIcon()}
            </View>
          </View>
          <View style={styles.taskCardContent}>
            <Text numberOfLines={1} style={styles.taskTitleText}>
              Draft up space adjacency documents
            </Text>
          </View>
          <View style={styles.taskCardRight}>
            <Text style={styles.selectedDurationText}>
              {this.state.selectedDuration}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
