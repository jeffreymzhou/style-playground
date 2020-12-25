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
import styles from './WeekHistory.component.style';
import theme from '../../../styles/theme.style.js';
export default class WeekHistory extends React.Component {
  exampleProp = [
    {
      date: 11,
      complete: true,
      status: 'past',
    },
    {
      date: 12,
      complete: false,
      status: 'past',
    },
    {
      date: 13,
      complete: true,
      status: 'past',
    },
    {
      date: 14,
      complete: false,
      status: 'today',
    },
    {
      date: 15,
      complete: false,
      status: 'future',
    },
    {
      date: 16,
      complete: false,
      status: 'future',
    },
    {
      date: 17,
      complete: false,
      status: 'future',
    },
  ];

  dateCubeColumn(dateObject, dayOfWeek, index) {
    let status = dateObject.status + (dateObject.complete ? 'Complete' : '');
    return (
      <View key={index} style={styles.weekHistoryColumn}>
        <Text style={styles.weekHistoryFont}>{dateObject.date}</Text>
        <View style={[styles.dateCube, styles[status]]}>
          {dateObject.complete ? (
            <FontAwesome5 style={styles.dateCubeIcon} name='check' />
          ) : (
            []
          )}
        </View>
        <Text
          style={[
            styles.weekHistoryFont,
            dateObject.status === 'today' ? styles.todayFont : [],
          ]}
        >
          {dayOfWeek}
        </Text>
      </View>
    );
  }

  dateCubeColumns(dateArray) {
    var dateCubeColumns = [];
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    daysOfWeek.forEach((dayOfWeek, index) => {
      dateCubeColumns.push(this.dateCubeColumn(dateArray[index], dayOfWeek, index));
    });
    return dateCubeColumns;
  }
  render() {
    var scaleValue = new Animated.Value(0);
    function scale() {
      scaleValue.setValue(0);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.easeOutBack,
      }).start();
    }
    const buttonScale = scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.9, 1],
    });
    return (
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Haptics.impactAsync();
            scale();
          }}
          style={styles.weekHistoryContainer}
        >
          <View style={[styles.weekHistoryColumn, { flex: 0.5 }]}></View>
          {this.dateCubeColumns(this.exampleProp)}
          <View style={[styles.weekHistoryColumn, { flex: 0.5 }]}></View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
