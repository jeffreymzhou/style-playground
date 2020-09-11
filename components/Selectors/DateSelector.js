import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../../styles/theme.style.js';
import commonStyle from '../../styles/common.style.js';

export default class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.props.date || new Date(Date.now()),
    };
  }

  selectDate = (event, selectedDate) => {
    this.setState({ selectedDate });
  };

  clear() {
    this.setState({ selectedDate: new Date(Date.now()) });
    this.props.onConfirm(null);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.BACKGROUND_COLOR,
          // height: '100%',
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
          Choose a due date
        </Text>
        <DateTimePicker
          testID='dateTimePicker'
          value={this.state.selectedDate}
          minimumDate={this.props.date || new Date(Date.now())}
          textColor={theme.PRIMARY_COLOR}
          mode={'date'}
          is24Hour={true}
          display='default'
          onChange={this.selectDate}
        />
        <TouchableOpacity
          onPress={() => this.props.onConfirm(this.state.selectedDate)}
          style={commonStyle.outlineButton}
        >
          <Text style={commonStyle.outlineButtonText}>save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.clear()}
          style={commonStyle.warningButton}
        >
          <Text style={commonStyle.warningButtonText}>
            {this.props.date ? 'clear' : 'cancel'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
