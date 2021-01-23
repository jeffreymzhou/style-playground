import * as React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import DateSelector from '@/components/Selectors/DateSelector.js';
import DurationSelector from '@/components/Selectors/DurationSelector.js';
import commonStyle from '@/styles/common.style.js';
import theme from '@/styles/theme.style.js';

import TimeParser from '@/utils/TimeParser';

import { Task } from '@/storage/data_schema/Task';

export default class NewTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task || new Task(),
      name: '',
      dueDate: null,
      duration: null,
      dateSelectorModalVisible: false,
      durationSelectorModalVisible: false,
      focusNameInput: false,
      nameTextInput: '',
    };
  }

  updateTask(newValue, key) {
    this.state.task[key] = newValue;
    this.forceUpdate();
  }

  nameInput() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Haptics.impactAsync();
          this.nameTextInput.focus();
        }}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#DFDFDF',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, flex: 1 }}>Name:</Text>
        <TextInput
          style={{
            flex: 4,
            fontSize: 20,
            textAlignVertical: 'top',
            paddingTop: 0,
          }}
          selectionColor={theme.PRIMARY_COLOR}
          ref={(input) => {
            this.nameTextInput = input;
          }}
          multiline={true}
          onChangeText={(text) => this.updateTask(text, 'title')}
          // value={this.state.task ? this.state.task.title : ''}
          blurOnSubmit={true}
        />
      </TouchableOpacity>
    );
  }

  dueDateInput() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Haptics.impactAsync();
          this.setState({ dateSelectorModalVisible: true });
        }}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#DFDFDF',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, flex: 1 }}>
          Due:{' '}
          {this.state.task && this.state.task.dueDate
            ? TimeParser.dateToString(this.state.task.dueDate)
            : ''}
        </Text>
      </TouchableOpacity>
    );
  }

  durationInput() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Haptics.impactAsync();
          this.setState({ durationSelectorModalVisible: true });
        }}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#DFDFDF',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, flex: 1 }}>
          Time to Complete:{' '}
          {this.state.task && this.state.task.timeLeft
            ? TimeParser.minutesToString(this.state.task.timeLeft)
            : ''}
        </Text>
      </TouchableOpacity>
    );
  }

  dateSelectorModal() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.dateSelectorModalVisible}
      >
        <TouchableOpacity
          style={{
            height: '50%',
            justifyContent: 'flex-end',
          }}
          onPress={() => this.closeDateSelectorModal()}
        ></TouchableOpacity>
        <View
          style={{
            height: '50%',
            // alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'black',
          }}
        >
          <DateSelector
            onConfirm={(date) => this.setDueDate(date)}
            onCancel={() => this.closeDateSelectorModal()}
            date={this.state.task ? this.state.task.dueDate : null}
          />
        </View>
      </Modal>
    );
  }

  durationSelectorModal() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.durationSelectorModalVisible}
      >
        <TouchableOpacity
          style={{
            height: '50%',
          }}
          onPress={() => this.closeDurationSelectorModal()}
        ></TouchableOpacity>
        <View
          style={{
            height: '50%',
            // alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'black',
          }}
        >
          <DurationSelector
            save={(minutes) => this.setDuration(minutes)}
            close={() => this.closeDurationSelectorModal()}
            duration={this.state.duration}
          />
        </View>
      </Modal>
    );
  }

  saveButton() {
    return (
      <View
        style={{
          padding: 20,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={() => this.saveTask()}
          activeOpacity={0.5}
          style={commonStyle.solidButton}
        >
          <Text style={commonStyle.solidButtonText}>save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  setDueDate(date) {
    this.updateTask(date, 'dueDate');
    this.closeDateSelectorModal();
  }

  closeDateSelectorModal() {
    this.setState({ dateSelectorModalVisible: false });
    Keyboard.dismiss;
  }

  setDuration(minutes) {
    this.updateTask(minutes, 'timeLeft');
    this.closeDurationSelectorModal();
  }

  closeDurationSelectorModal() {
    this.setState({ durationSelectorModalVisible: false });
    Keyboard.dismiss;
  }

  saveTask() {
    Haptics.selectionAsync();
    if (this.state.task && this.state.task.title.length === 0) {
      Alert.alert('Please enter a name', '', [{ text: 'OK' }], {
        cancelable: false,
      });
    } else {
      global.storage.saveTask(this.state.task);
      console.log('saving', this.state.task);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{
          height: '100%',
          width: '100%',
          borderTopWidth: 1,
          borderColor: '#DFDFDF',
          backgroundColor: theme.BACKGROUND_COLOR,
        }}>
          {this.nameInput()}
          {this.dueDateInput()}
          {this.durationInput()}
          {this.dateSelectorModal()}
          {this.durationSelectorModal()}
          {this.saveButton()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({});
