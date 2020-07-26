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
import { Feather, FontAwesome5 } from '@expo/vector-icons';

// style imports
import styles from './TaskCard.component.style';
import theme from '../../styles/theme.style';
export default class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      expanded: false,
      expandValue: new Animated.Value(0),
      selectValue: new Animated.Value(0),
      selectedDuration: '',
    };
  }

  onCardPress() {
    Haptics.impactAsync();
    if (this.state.expanded) {
      this.unexpand();
    } else {
      if (this.state.selected) {
        this.deselect();
      } else {
        this.expand();
      }
    }
  }

  onDurationSelect(duration) {
    Haptics.impactAsync();
    this.select();
    this.setState({ selectedDuration: duration });
  }

  select() {
    if (!this.state.selected) {
      this.state.selectValue.setValue(0);
      Animated.timing(this.state.selectValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.easeOutBack,
      }).start();
      this.setState({ selected: true });
    }
    this.unexpand();
  }

  deselect() {
    this.state.selectValue.setValue(1);
    Animated.timing(this.state.selectValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.easeOutBack,
    }).start();
    this.setState({ selected: false });
    this.setState({ selectedDuration: '' });
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
    const borderWidthAnimatedValue = this.state.expandValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1.5, 3],
    });
    const expandedOrSelected = Animated.add(
      this.state.expandValue,
      this.state.selectValue
    );
    const borderColorAnimatedValue = expandedOrSelected.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        theme.LIGHT_GREY_COLOR,
        theme.SECONDARY_COLOR,
        theme.SECONDARY_COLOR,
      ],
    });
    const containerHeightAnimatedValue = this.state.expandValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.TASK_CARD_HEIGHT + theme.CARD_BORDER_WIDTH * 2, 90],
    });
    const durationSelectorHeightAnimatedValue = this.state.expandValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [0, 30],
      }
    );
    const taskCircleBorderWidthAnimatedValue = this.state.selectValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [theme.CARD_BORDER_WIDTH, 8],
      }
    );
    const taskCircleColorAnimatedValue = this.state.selectValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.MEDIUM_GREY_COLOR, theme.SECONDARY_COLOR],
    });
    return (
      <Animated.View
        style={[
          {
            borderWidth: borderWidthAnimatedValue,
            height: containerHeightAnimatedValue,
            borderColor: borderColorAnimatedValue,
            backgroundColor: borderColorAnimatedValue,
          },
          styles.taskCardContainer,
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.onCardPress();
          }}
          style={styles.taskCard}
        >
          <View style={styles.taskCardLeft}>
            <Animated.View
              style={[
                styles.taskCircle,
                {
                  borderWidth: taskCircleBorderWidthAnimatedValue,
                  borderColor: taskCircleColorAnimatedValue,
                },
              ]}
            ></Animated.View>
          </View>
          <View style={styles.taskCardContent}>
            <Text numberOfLines={1} style={styles.taskTitleText}>
              Draft up space adjacency documents
            </Text>
            <Text style={styles.taskDetailsText}>due friday • 1 hr left</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (this.state.expanded) {
                this.unexpand();
              } else {
                this.expand();
              }
            }}
            style={styles.taskCardRight}
          >
            <Animated.View style={{ opacity: this.state.selectValue }}>
              <Text style={styles.selectedDurationText}>
                {this.state.selectedDuration}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
        <Animated.View
          style={[
            {
              height: durationSelectorHeightAnimatedValue,
            },
            styles.durationSelectorBar,
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
              10 m
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.onDurationSelect('20 m');
            }}
            style={
              this.state.selectedDuration === '20 m'
                ? styles.durationSelectorButtonActive
                : styles.durationSelectorButton
            }
          >
            <Text
              style={
                this.state.selectedDuration === '20 m'
                  ? styles.durationSelectorTextActive
                  : styles.durationSelectorText
              }
            >
              20 m
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
              30 m
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
              1 h
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.onDurationSelect('2 h');
            }}
            style={
              this.state.selectedDuration === '2 h'
                ? styles.durationSelectorButtonActive
                : styles.durationSelectorButton
            }
          >
            <Text
              style={
                this.state.selectedDuration === '2 h'
                  ? styles.durationSelectorTextActive
                  : styles.durationSelectorText
              }
            >
              2 h
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}
