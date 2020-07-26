import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
// import { AntDesign } from '@expo/vector-icons'
// import { MaterialIcons } from '@expo/vector-icons'
// import { Feather } from '@expo/vector-icons'
import { Feather, FontAwesome5 } from '@expo/vector-icons';
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
      selectValue: new Animated.Value(0),
      selectedDuration: '15 m',
    };
  }

  onCardPress() {
    Haptics.impactAsync();
    if (this.state.selected) {
      this.deselect();
    } else {
      this.select();
    }
  }

  select() {
    this.state.selectValue.setValue(0);
    Animated.timing(this.state.selectValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.easeOutBack,
    }).start();
    this.setState({ selected: true });
    this.setState({ selectedOrder: 1 });
  }

  deselect() {
    this.state.selectValue.setValue(1);
    Animated.timing(this.state.selectValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.easeOutBack,
    }).start();
    this.setState({ selected: false });
    this.setState({ selectedOrder: '' });
  }

  render() {
    const borderColorAnimatedValue = this.state.selectValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.LIGHT_GREY_COLOR, theme.SECONDARY_COLOR],
    });

    const taskCircleBorderWidthAnimatedValue = this.state.selectValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [theme.CARD_BORDER_WIDTH, 12.5],
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
            borderWidth: theme.CARD_BORDER_WIDTH,
            height: theme.TASK_CARD_HEIGHT + theme.CARD_BORDER_WIDTH * 2,
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
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                alignSelf: 'center',
                fontWeight: '800',
                fontSize: 14,
              }}
            >
              {this.state.selectedOrder}
            </Text>
          </View>
          <View style={styles.taskCardContent}>
            <Text numberOfLines={1} style={styles.taskTitleText}>
              Draft up space adjacency documents
            </Text>
            <Text style={styles.taskDetailsText}>due friday • 1 hr left</Text>
          </View>
          <View style={styles.taskCardRight}>
            <View>
              <Text style={{ color: '#A6B9FF', fontSize: 13 }}>
                {this.state.selectedDuration}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
