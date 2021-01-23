import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import * as Haptics from 'expo-haptics';
import * as Progress from 'react-native-progress';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import { NavigationContainer, BaseRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

import theme from './styles/theme.style.js';

// components

import TimerCircle from './components/TimerCircle.js';

// screens

import HomeScreen from './screens/HomeScreen.js';
import SelectTimeScreen from './screens/FocusBlock/SelectTimeScreen.js';
import SelectTasksScreen from './screens/SelectTasksScreen.js';
import OrderTasksScreen from './screens/OrderTasksScreen.js';
import TaskListScreen from './screens/FocusBlockTaskList.js';
import NewTaskScreen from './screens/NewTaskScreen.js';
import AllTasksScreen from './screens/AllTasksScreen.js';
// import CurrentTaskScreen from './components/TimerCircle.js';

// storage

import DataCache from './storage/Storage.js';

// parser

import TimeParser from './utils/TimeParser.js';

// redux

import { createStore } from 'redux';
import { Provider } from 'react-redux';
const initialState = {
  counter: 0,
};

const reducer = (state = initialState) => {
  return state;
};
const store = createStore(reducer);

function CurrentTaskScreen({ navigation, route }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.BACKGROUND_COLOR,
      }}
    >
      <TimerCircle navigation={navigation} />
    </View>
  );
}

// function TaskListScreen({ navigation, route }) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <TaskList navigation={navigation} />
//     </View>
//   );
// }

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const FocusBlockStack = createStackNavigator();
const DoFocusBlockStack = createStackNavigator();
const CreateFocusBlockStack = createStackNavigator();

function FocusBlockStackScreen() {
  return (
    <FocusBlockStack.Navigator
      initialRouteName={'CreateFocusBlockStackScreen'}
      screenOptions={{
        cardStyle: { backgroundColor: theme.BACKGROUND_COLOR },
      }}
    >
      <FocusBlockStack.Screen
        name='CreateFocusBlockStackScreen'
        component={CreateFocusBlockStackScreen}
      ></FocusBlockStack.Screen>
      <FocusBlockStack.Screen
        name='DoFocusBlockStackScreen'
        component={DoFocusBlockStackScreen}
      ></FocusBlockStack.Screen>
    </FocusBlockStack.Navigator>
  );
}

function DoFocusBlockStackScreen() {
  return (
    <DoFocusBlockStack.Navigator
      initialRouteName={'TaskList'}
      headerMode={'float'}
      screenOptions={{
        title: 'Header',
        cardStyle: { backgroundColor: theme.BACKGROUND_COLOR },
        headerStyle: {
          height: 50,
          width: '100%',
          marginTop: 10,
          navigationOptions: {
            gesturesEnabled: false,
          },
        },
        headerShown: true,
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;

          return (
            <View style={options.headerStyle}>
              <View style={styles.progressBarHeaderContainer}>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarRow}>
                    <View style={styles.progressBarRow}>
                      <View
                        style={{
                          width: '100%',
                          height: 8,
                          backgroundColor: '#E7E7E7',
                          borderRadius: 5,
                        }}
                      >
                        <View
                          style={{
                            width: '40%',
                            height: '100%',
                            borderRadius: 5,
                            backgroundColor: '#8696D2',
                          }}
                        ></View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.progressBarTextRow}>
                    <Text style={styles.progressBarText}>46% complete</Text>
                    <Text style={styles.progressBarText}>1 hr 20 m left</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        },
      }}
    >
      <DoFocusBlockStack.Screen
        name='TaskList'
        component={TaskListScreen}
      ></DoFocusBlockStack.Screen>
      <DoFocusBlockStack.Screen
        name='CurrentTask'
        component={CurrentTaskScreen}
      ></DoFocusBlockStack.Screen>
    </DoFocusBlockStack.Navigator>
  );
}

function CreateFocusBlockStackScreen() {
  return (
    <CreateFocusBlockStack.Navigator
      mode='card'
      headerMode={'float'}
      screenOptions={{
        title: 'Header',
        headerStyle: {
          height: 50,
          width: '100%',
          backgroundColor: theme.BACKGROUND_COLOR,
        },
        headerShown: true,
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          var step1 = scene.route.name === 'page2' ? 1 : 2
          // var progress1 = Animated.subtract(
          //   scene.route.name === 'page3' || scene.route.name === 'page2'
          //     ? 1
          //     : scene.progress.current,
          //   scene.route.name === 'page1' ? 1 : 0
          // );
          // var progress2 = Animated.subtract(
          //   scene.route.name === 'page1' || scene.route.name === 'page3'
          //     ? 1
          //     : scene.progress.current,
          //   scene.route.name === 'page2' ? 1 : 0
          // );
          // var progress3 = Animated.subtract(
          //   scene.route.name === 'page1' || scene.route.name === 'page2'
          //     ? 1
          //     : scene.progress.current,
          //   scene.route.name === 'page3' ? 1 : 0
          // );
          // const page1 = progress1.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [1, 0],
          // });
          // const page2 = progress2.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [1, 0],
          // });
          // const page3 = progress3.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [1, 0],
          // });
          return (
            <View style={[options.headerStyle, styles.navIndicatorHeader]}>
              {/* <TouchableOpacity
                style={styles.navIndicatorHeaderColumn}
                onPress={() => {
                  Haptics.impactAsync();
                  navigation.navigate('page1');
                }}
              >
                <View style={styles.navIndicatorBar} />
                <Animated.View
                  style={[styles.navIndicatorBarActive, { opacity: page1 }]}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.navIndicatorHeaderColumn}
                onPress={() => {
                  Haptics.impactAsync();
                  navigation.navigate('page2');
                }}
              >
                <View style={styles.navIndicatorBar} />
                <Animated.View
                  style={[styles.navIndicatorBarActive, { opacity: 1 }]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navIndicatorHeaderColumn}
                onPress={() => {
                  Haptics.impactAsync();
                  navigation.navigate('page3');
                }}
              >
                <View style={styles.navIndicatorBar} />
                <Animated.View
                  style={[styles.navIndicatorBarActive, { opacity: 1 }]}
                />
              </TouchableOpacity>
            </View>
          );
        },
      }}
    >
      {/* <CreateFocusBlockStack.Screen
        name='page1'
        component={SelectTimeScreen}
      ></CreateFocusBlockStack.Screen> */}
      <CreateFocusBlockStack.Screen
        name='page2'
        component={SelectTasksScreen}
      ></CreateFocusBlockStack.Screen>
      <CreateFocusBlockStack.Screen
        name='page3'
        component={OrderTasksScreen}
      ></CreateFocusBlockStack.Screen>
    </CreateFocusBlockStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator
      mode='modal'
      headerMode={'float'}
      screenOptions={{
        // headerStyle: {
        //   height: 60,
        //   backgroundColor: theme.BACKGROUND_COLOR,
        // },
        cardStyle: { backgroundColor: theme.BACKGROUND_COLOR },
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          var progress = Animated.subtract(
            scene.progress.current,
            scene.route.name === 'Main' ? 1 : 0
          );
          const spin = progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          });
          const mainTitleOpacity = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });

          var headerTitle;
          switch (scene.route.name) {
            case 'NewTaskModal':
              headerTitle = 'new task';
              break;
            case 'FocusBlock':
              headerTitle = 'new focus block';
              break;
            default:
              headerTitle = scene.route.name;
          }

          return (
            <View style={[options.headerStyle, styles.customHeader]}>
              <TouchableOpacity
                style={styles.customHeaderLeft}
                onPress={() => {
                  Haptics.impactAsync();
                  navigation.openDrawer();
                }}
              >
                <Animated.View
                  style={[{ opacity: mainTitleOpacity }, styles.headerTitle]}
                >
                  <Feather style={styles.headerButton} name='menu' />
                </Animated.View>
              </TouchableOpacity>
              <View style={styles.customHeaderCenter}>
                <Animated.View
                  style={[{ opacity: mainTitleOpacity }, styles.headerTitle]}
                >
                  <Text style={styles.headerTitleText}>
                    {TimeParser.currentDateHeader()}
                  </Text>
                </Animated.View>
                <Animated.View
                  style={[{ opacity: progress }, styles.headerTitle]}
                >
                  <Text style={styles.headerTitleText}>{headerTitle}</Text>
                </Animated.View>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.customHeaderRight}
                onPress={() => {
                  Haptics.impactAsync();
                  navigation.navigate(
                    scene.route.name === 'Main' ? 'NewTaskModal' : 'Main'
                  );
                }}
              >
                <Animated.View
                  style={{
                    transform: [{ rotate: spin }],
                  }}
                >
                  <Feather style={styles.headerButton} name='plus' />
                </Animated.View>
              </TouchableOpacity>
            </View>
          );
        },
      }}
    >
      <RootStack.Screen
        name='Main'
        component={MainStackScreen}
        options={{ headerShown: true }}
      />
      <RootStack.Screen name='NewTaskModal' component={NewTaskScreen} />
      <RootStack.Screen name='FocusBlock' component={FocusBlockStackScreen} />
    </RootStack.Navigator>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName={'Home'}
      headerMode={'float'}
      // mode={'card'}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 30,
          backgroundColor: theme.BACKGROUND_COLOR,
          cardStyle: { backgroundColor: theme.BACKGROUND_COLOR },
        },
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const taskButtonOpacity = Animated.subtract(
            scene.progress.current,
            scene.route.name === 'Home' ? 1 : 0
          );
          const homeButtonOpacity = taskButtonOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });
          return (
            <View style={options.headerStyle}>
              <Animated.View
                style={[styles.headerNav, { opacity: homeButtonOpacity }]}
              >
                <TouchableOpacity style={styles.headerNavButtonActive}>
                  <Text style={styles.headerNavButtonTextActive}>today</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerNavButton}>
                  <Text style={styles.headerNavButtonText}>tasks</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={[styles.headerNav, { opacity: taskButtonOpacity }]}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (scene.route.name !== 'Home') {
                      Haptics.impactAsync();
                    }
                    navigation.navigate('Home');
                  }}
                  style={styles.headerNavButton}
                >
                  <Text style={styles.headerNavButtonText}>today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (scene.route.name !== 'Tasks') {
                      Haptics.impactAsync();
                    }
                    navigation.navigate('Tasks');
                  }}
                  style={styles.headerNavButtonActive}
                >
                  <Text style={styles.headerNavButtonTextActive}>tasks</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        },
      }}
    >
      <MainStack.Screen name='Home' component={HomeScreen} />
      <MainStack.Screen
        name='Tasks'
        component={AllTasksScreen}
        initialParams={{ text: 'default text' }}
      />
    </MainStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function App() {
  global.storage = new DataCache();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name='Root' component={RootStackScreen} />
          <Drawer.Screen name='Other Screen' component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


function newTaskModal({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        borderColor: '#DFDFDF',
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: theme.BACKGROUND_COLOR,
        alignItems: 'center',
      }}
    >
      <NewTaskScreen navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerNav: {
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#6A7AB7',
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
  },
  headerNavButton: {
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerNavButtonText: {
    color: '#6A7AB7',
    fontWeight: '500',
  },
  headerNavButtonActive: {
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#6A7AB7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerNavButtonTextActive: {
    color: theme.BACKGROUND_COLOR,
    fontWeight: '600',
  },
  customHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 60,
    backgroundColor: theme.BACKGROUND_COLOR,
  },
  customHeaderLeft: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customHeaderCenter: {
    flex: 3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customHeaderRight: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'grey'
  },
  headerButton: {
    fontSize: 35,
    color: '#6A7AB7',
  },
  headerButtonRed: {
    fontSize: 35,
    color: theme.LIGHT_VIOLET_COLOR,
  },
  headerTitle: {
    alignSelf: 'center',
    position: 'absolute',
  },
  headerTitleText: {
    color: '#6A7AB7',
    fontWeight: '500',
    fontSize: 24,
  },
  bottomActionButton: {
    height: 60,
    width: '90%',
    backgroundColor: '#6A7AB7',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActionButtonText: {
    color: theme.BACKGROUND_COLOR,
    fontSize: 24,
    fontWeight: '500',
  },
  navIndicatorHeader: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIndicatorBar: {
    height: 7,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#989898',
    position: 'absolute',
  },
  navIndicatorHeaderColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  navIndicatorBarActive: {
    height: 7,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#6A7AB7',
    position: 'absolute',
  },
  progressBarContainer: {
    flex: 0.5,
    // backgroundColor: 'grey',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  progressBarRow: {
    // flex: 1,
    // borderWidth: 2,,
  },
  progressBarTextRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    // borderWidth: 2,
  },
  progressBarText: {
    fontSize: 13,
    color: '#989898',
  },
  progressBarHeaderContainer: {
    // backgroundColor: 'black',
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
});

export default App;
