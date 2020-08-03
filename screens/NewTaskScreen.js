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
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

export default class NewTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dueDate: '',
      estimatedTimeLeft: '',
    };
  }

  onChangeText(text) {
    this.setState({ name: text });
  }

  nameInput() {
    return (
      <View
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
            height: 40,
            borderColor: 'gray',
            // borderWidth: 1,
          }}
          onChangeText={(text) => this.onChangeText(text)}
          value={this.state.name}
        />
      </View>
    );
  }

  dueDateInput() {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#DFDFDF',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, flex: 1 }}>Due:</Text>
        <TextInput
          style={{
            flex: 4,
            fontSize: 20,
            height: 40,
            borderColor: 'gray',
            // borderWidth: 1,
          }}
          onChangeText={(text) => this.onChangeText(text)}
          value={this.state.name}
        />
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ backgroundColor: 'pink', height: '100%' }}>
          {this.nameInput()}
          {this.dueDateInput()}
          <View>
            <Text style={{ fontSize: 30 }}>Estimated Time to Complete:</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({});
