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
      <View style={{ width: '100%', height: '80%', flexDirection: 'column' }}>
        <View
          style={{
            flex: 2,
            backgroundColor: 'white',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Text>Commit yourself today.</Text>
          <View style={styles.timeSelectorContainer}>
            <View style={styles.timeSelectorColumn}>
              <TouchableOpacity
                style={styles.timeSelectorButtonWrapper}
                onPress={() => this.add1hour()}
              >
                <AntDesign style={styles.timeSelectorButton} name='caretup' />
              </TouchableOpacity>
              <Text style={styles.timeSelectorText}>{this.state.hours} hr</Text>
              <TouchableOpacity
                style={styles.timeSelectorButtonWrapper}
                onPress={() => this.subtract1hour()}
              >
                <AntDesign style={styles.timeSelectorButton} name='caretdown' />
              </TouchableOpacity>
            </View>
            <View style={styles.timeSelectorColumn}>
              <TouchableOpacity
                style={styles.timeSelectorButtonWrapper}
                onPress={() => this.add10min()}
              >
                <AntDesign style={styles.timeSelectorButton} name='caretup' />
              </TouchableOpacity>
              <Text style={styles.timeSelectorText}>
                {this.state.minutes} min
              </Text>
              <TouchableOpacity
                style={styles.timeSelectorButtonWrapper}
                onPress={() => this.subtract10min()}
              >
                <AntDesign style={styles.timeSelectorButton} name='caretdown' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.divider}></View>
        </View>
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
