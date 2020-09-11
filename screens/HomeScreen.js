import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme.style.js';
import commonStyle from '../styles/common.style';
// components

import WeekHistory from '../components/History/WeekHistory/WeekHistory.js';
import FocusRecommendation from '../components/FocusRecommendation.js';
import DailyQuote from '../components/DailyQuote.js';

export default class HomeScreen extends React.Component {
  // navigation = useNavigation();
  render() {
    // const navigation = useNavigation();
    return (
      <View style={{ backgroundColor: theme.BACKGROUND_COLOR }}>
        <ScrollView contentContainerStyle={commonStyle.screenContainerStyle}>
          <View style={{ width: '90%' }}>
            <WeekHistory />
            <DailyQuote />
            <FocusRecommendation />
            <Text style={{ color: '#717171', marginTop: 10, marginBottom: 10 }}>
              Due today:
            </Text>
            <View style={styles.taskCard}>
              <View style={styles.taskCardLeft}>
                <View style={styles.taskCircle}></View>
              </View>
              <View style={styles.taskCardContent}>
                <Text
                  style={{ color: '#717171', fontSize: 16, fontWeight: '500' }}
                >
                  Task example title
                </Text>
                <Text style={{ color: '#717171', fontSize: 13 }}>
                  1 hr left
                </Text>
              </View>
            </View>
            <View style={styles.taskCard}>
              <View style={styles.taskCardLeft}>
                <View style={styles.taskCircle}></View>
              </View>
              <View style={styles.taskCardContent}>
                <Text
                  style={{ color: '#717171', fontSize: 16, fontWeight: '500' }}
                >
                  Task example title
                </Text>
                <Text style={{ color: '#717171', fontSize: 13 }}>
                  1 hr left
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[commonStyle.solidButton, commonStyle.bottomButton]}
          onPress={() => this.props.navigation.navigate('FocusBlock')}
        >
          <Text style={commonStyle.solidButtonText}>get stuff done today</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  taskCard: {
    // backgroundColor: 'black',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  taskCardLeft: {
    // backgroundColor: 'blue',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCardContent: {
    // backgroundColor: 'grey',
    flex: 4,
    height: '100%',
    justifyContent: 'space-around',
  },
  taskCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#BCBCBC',
  },
});
