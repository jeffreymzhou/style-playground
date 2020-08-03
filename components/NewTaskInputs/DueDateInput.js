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
import { Feather, FontAwesome5, Entypo } from '@expo/vector-icons';

// style imports
import styles from './TaskCard.component.style';
import theme from '../../styles/theme.style';
export default class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      expanded: false,
      expandValue: new Animated.Value(0),
      selectValue: new Animated.Value(0),
    };
  }

  onPress() {
    Haptics.impactAsync();
    if (this.state.expanded) {
      this.unexpand();
    } else {
      this.expand();
    }
  }

  static dateToString(d) {
    // create string arrays
    const monthArray = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const dayOfWeekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dateArray = [
      '0',
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '10th',
      '11th',
      '12th',
      '13th',
      '14th',
      '15th',
      '16th',
      '17th',
      '18th',
      '19th',
      '20th',
      '21st',
      '22nd',
      '23rd',
      '24th',
      '25th',
      '26th',
      '27th',
      '28th',
      '29th',
      '30th',
      '31st',
    ];
    const year = d.getFullYear();
    const monthIndex = d.getMonth();
    const dayIndex = d.getDay();
    const dateIndex = d.getDate();
    const monthString = monthArray[monthIndex];
    const dayOfWeekString = dayOfWeekArray[dayIndex];
    const dateString = dateArray[dateIndex];
    return (
      dayOfWeekString + ', ' + monthString + ' ' + dateString + ', ' + year
    );
  }

  select(dueDate) {
    Haptics.impactAsync();
    this.setState({ selectedDueDate: dueDate });
    this.props.select(dueDate);
    this.unexpand();
  }

  deselect() {
    this.setState({ selectedDueDate: null });
    this.props.deselect();
    this.unexpand();
  }

  expand() {
    this.state.expandValue.setValue(0);
    Animated.timing(this.state.expandValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.easeOutBack,
    }).start();
    this.setState({ expanded: true });
  }

  unexpand() {
    this.state.expandValue.setValue(1);
    Animated.timing(this.state.expandValue, {
      toValue: 0,
      duration: 150,
      easing: Easing.easeOutBack,
    }).start();
    this.setState({ expanded: false });
  }

  render() {
    const dueDateSelectorHeightAnimatedValue = this.state.expandValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [0, 30],
      }
    );
    const chevronRotationAnimatedValue = this.state.expandValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });
    return (
      <View
        style={[
          {
            height: containerHeightAnimatedValue,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (this.state.expanded) {
              this.unexpand();
            } else {
              this.expand();
            }
          }}
        ></TouchableOpacity>
        <Animated.View
          style={[
            {
              height: dueDateSelectorHeightAnimatedValue,
            },
            styles.dueDateSelector,
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.onDurationSelect('10 m');
            }}
            style={
              this.state.selectedDuration === '10 m'
                ? styles.durationSelectorButtonActive
                : styles.durationSelectorButton
            }
          >
            <Text
              style={
                this.state.selectedDuration === '10 m'
                  ? styles.durationSelectorTextActive
                  : styles.durationSelectorText
              }
            >
              today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.onDurationSelect('20 m');
            }}
            style={
              this.state.selectedDueDate === '20 m'
                ? styles.dueDateSelectorButtonActive
                : styles.dueDateSelectorButton
            }
          >
            <Text
              style={
                this.state.selectedDuration === '20 m'
                  ? styles.dueDateSelectorTextActive
                  : styles.dueDateSelectorText
              }
            >
              tomorrow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.onDurationSelect('30 m');
            }}
            style={
              this.state.selectedDuration === '30 m'
                ? styles.durationSelectorButtonActive
                : styles.durationSelectorButton
            }
          >
            <Text
              style={
                this.state.selectedDuration === '30 m'
                  ? styles.durationSelectorTextActive
                  : styles.durationSelectorText
              }
            >
              in 1 week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.onDurationSelect('1 h');
            }}
            style={
              this.state.selectedDuration === '1 h'
                ? styles.durationSelectorButtonActive
                : styles.durationSelectorButton
            }
          >
            <Text
              style={
                this.state.selectedDuration === '1 h'
                  ? styles.durationSelectorTextActive
                  : styles.durationSelectorText
              }
            >
              custom
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dueDateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
