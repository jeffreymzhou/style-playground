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

import theme from '../../styles/theme.style.js';
import commonStyle from '../../styles/common.style.js';

export default class SelectTimeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: this.props.duration ? Math.floor(this.props.duration / 60) : 0,
      minutes: this.props.duration ? this.props.duration % 60 : 0,
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

  onSave() {
    const totalMinutes = this.state.hours * 60 + this.state.minutes;
    this.props.save(totalMinutes);
    this.props.close();
  }

  onClear() {
    this.setState({
      hours: 0,
      minutes: 0,
    });
    this.props.save(null);
    this.props.close();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.BACKGROUND_COLOR,
          borderRadius: 15,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: theme.PRIMARY_COLOR,
            fontWeight: '400',
            alignSelf: 'center',
          }}
        >
          Estimate the duration
        </Text>
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
              <AntDesign
                style={
                  this.state.hours == 0
                    ? styles.timeSelectorButtonDisabled
                    : styles.timeSelectorButton
                }
                name='caretdown'
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeSelectorColumn}>
            <TouchableOpacity
              style={styles.timeSelectorButtonWrapper}
              onPress={() => this.add10min()}
            >
              <AntDesign
                style={
                  this.state.minutes == 50
                    ? styles.timeSelectorButtonDisabled
                    : styles.timeSelectorButton
                }
                name='caretup'
              />
            </TouchableOpacity>
            <Text style={styles.timeSelectorText}>
              {this.state.minutes} min
            </Text>
            <TouchableOpacity
              style={styles.timeSelectorButtonWrapper}
              onPress={() => this.subtract10min()}
            >
              <AntDesign
                style={
                  this.state.minutes == 0
                    ? styles.timeSelectorButtonDisabled
                    : styles.timeSelectorButton
                }
                name='caretdown'
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onSave()}
          style={commonStyle.outlineButton}
        >
          <Text style={commonStyle.outlineButtonText}>save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onClear()}
          style={commonStyle.warningButton}
        >
          <Text style={commonStyle.warningButtonText}>clear</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeSelectorButton: {
    fontSize: 40,
    color: theme.SECONDARY_COLOR,
  },
  timeSelectorButtonDisabled: {
    fontSize: 40,
    color: theme.MEDIUM_GREY_COLOR,
  },
  timeSelectorText: {
    fontSize: 30,
    color: theme.DARK_GREY_COLOR,
    fontWeight: '400',
  },
  timeSelectorContainer: {
    // backgroundColor: 'grey',
    // width: '80%',
    height: 220,
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
});
