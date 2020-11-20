import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../styles/common.style.js';
import theme from '../styles/theme.style.js';
import DurationSelector from '../components/Selectors/DurationSelector.js';

export default class SelectTimeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
    };
  }

  add10min() {
    if (this.state.minutes !== 50) {
      this.setState({ minutes: this.state.minutes + 10 });
    }
  }

  subtract10min() {
    if (this.state.minutes !== 0) {
      this.setState({ minutes: this.state.minutes - 10 });
    }
  }

  add1hour() {
    this.setState({ hours: this.state.hours + 1 });
  }

  subtract1hour() {
    if (this.state.hours !== 0) {
      this.setState({ hours: this.state.hours - 1 });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: theme.BACKGROUND_COLOR }}>
      <DurationSelector />
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

const styles = StyleSheet.create({
  timeSelectorButton: {
    fontSize: 40,
    color: '#A6B9FF',
  },
  timeSelectorText: {
    fontSize: 30,
    color: '#989898',
    fontWeight: '400',
  },
  timeSelectorContainer: {
    // backgroundColor: 'grey',
    width: '80%',
    height: '80%',
    flexDirection: 'row',
  },
  timeSelectorColumn: {
    // borderWidth: 2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timeSelectorButtonWrapper: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 3,
    backgroundColor: '#DFE6FF',
    borderRadius: 3,
    width: '90%',
    alignSelf: 'center',
  },
});
