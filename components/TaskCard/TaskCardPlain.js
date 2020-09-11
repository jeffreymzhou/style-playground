import * as React from 'react';
import * as Haptics from 'expo-haptics';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

// icon imports
import {
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';
// style imports
import styles from './TaskCard.component.style';
import theme from '../../styles/theme.style';

import TimeParser from '../../utils/TimeParser';
export default class TaskCardPlain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: new Animated.Value(0),
      selected: false,
      // task: this.props.task
    };
  }

  onCardPress() {
    Haptics.impactAsync();
    if (this.state.selected) {
      this.deselect();
    } else {
      this.expand();
    }
  }

  onCirclePress() {
    Haptics.impactAsync();
    if (this.state.selected) {
      this.state.selectValue.setValue(1);
      Animated.timing(this.state.selectValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.easeOutBack,
        useNativeDriver: false,
      }).start();
      this.setState({ selected: false });
    } else {
      this.state.selectValue.setValue(0);
      Animated.timing(this.state.selectValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.easeOutBack,
        useNativeDriver: false,
      }).start();
      this.setState({ selected: true });
    }
  }

  uncheck() {}

  check() {}

  render() {
    const taskCircleBorderWidthAnimatedValue = this.state.selectValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [theme.CARD_BORDER_WIDTH, theme.TASK_CIRCLE_HEIGHT / 2],
      }
    );
    const taskCircleColorAnimatedValue = this.state.selectValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.MEDIUM_GREY_COLOR, theme.GREEN_COLOR],
    });
    const taskCardBorderColorAnimatedValue = this.state.selectValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [theme.MEDIUM_GREY_COLOR, theme.LIGHT_GREY_COLOR],
      }
    );

    const taskDetails = (
      <Text style={styles.taskDetailsText}>
        due{' '}
        {this.props.task.dueDate
          ? TimeParser.dateToString(this.props.task.dueDate)
          : ''}
        •
        {this.props.task.timeLeft
          ? TimeParser.minutesToString(this.props.task.timeLeft)
          : ''}{' '}
        left
      </Text>
    );
    return (
      <Animated.View
        style={[
          styles.taskCardContainer,
          {
            borderWidth: theme.CARD_BORDER_WIDTH,
            // borderWidth: 0,
            borderColor: taskCardBorderColorAnimatedValue,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Haptics.impactAsync();
            // console.log('open task details');
            this.props.onPress();
          }}
          style={styles.taskCard}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.onCirclePress();
            }}
            style={styles.taskCardLeft}
          >
            <Animated.View
              style={[
                styles.taskCircle,
                {
                  borderWidth: taskCircleBorderWidthAnimatedValue,
                  borderColor: taskCircleColorAnimatedValue,
                },
              ]}
            >
              <FontAwesome5 style={styles.taskCircleIcon} name='check' />
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.taskCardContent}>
            <Text
              numberOfLines={1}
              style={
                this.state.selected
                  ? styles.taskTitleTextStrikethrough
                  : styles.taskTitleText
              }
            >
              {this.props.task.title}
            </Text>
            {this.state.selected ? [] : taskDetails}
          </View>
          <View style={styles.taskCardRight}>
            <Animated.View style={{ opacity: this.state.selectValue }}>
              <Text style={styles.selectedDurationText}>
                {this.state.selectedDuration}
              </Text>
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
