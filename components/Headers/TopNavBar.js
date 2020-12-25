import * as React from 'react';
import * as Haptics from 'expo-haptics';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// helper functions
import TimeParser from '@/utils/TimeParser.js';

// styling 
import theme from '@/styles/theme.style.js';

/*
TopNavBar is the top bar that appears on the homescreen of the app.
Visually, it consists of the left "menu" icon, center title, and right "+" icon
Figma reference no: 1
*/

function TopNavBar({ scene, navigation }) {

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
    case 'NewTask':
      headerTitle = 'new task';
      break;
    case 'FocusBlock':
      headerTitle = 'focus';
      break;
    default:
      headerTitle = scene.route.name;
  }

  return (
    <View style={styles.header}>

      {/* left button (app drawer navigation) */}
      <TouchableOpacity
        style={[styles.headerSection, {flex: 1}]}
        onPress={() => {
          Haptics.impactAsync();
          navigation.openDrawer();
        }}
      >
        <Animated.View style={[{ opacity: mainTitleOpacity }, styles.headerTitle]}>
          <Feather style={styles.headerButton} name='menu' />
        </Animated.View>
      </TouchableOpacity>

      {/* center title */}
      <View style={[styles.headerSection, {flex: 3}]}>
        <Animated.View style={[{ opacity: mainTitleOpacity }, styles.headerTitle]}>
          <Text style={styles.headerTitleText}>
            {TimeParser.currentDateHeader()}
          </Text>
        </Animated.View>
        <Animated.View style={[{ opacity: progress }, styles.headerTitle]}>
          <Text style={styles.headerTitleText}>{headerTitle}</Text>
        </Animated.View>
      </View>

      {/* right button (new task) */}
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.headerSection, {flex: 1}]}
        onPress={() => {
          Haptics.impactAsync();
          navigation.navigate(scene.route.name === 'Main' ? 'NewTask' : 'Main');
        }}
      >
        <Animated.View style={{transform: [{ rotate: spin }]}}>
          <Feather style={styles.headerButton} name='plus' />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

export default TopNavBar;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 60,
    backgroundColor: theme.BACKGROUND_COLOR,
  },
  headerSection: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    fontSize: 35,
    color: theme.PRIMARY_COLOR,
  },
  headerTitle: {
    alignSelf: 'center',
    position: 'absolute',
  },
  headerTitleText: {
    color: theme.PRIMARY_COLOR,
    fontWeight: '500',
    fontSize: 24,
  }
});