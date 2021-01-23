import { StyleSheet } from 'react-native';
import theme from './theme.style.js';
export default StyleSheet.create({

  screenContainerStyle: {
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: 'center',
    // height: '100%',
  },

  primaryHeader: {},
  secondaryHeader: {},
  primaryText: {},
  secondaryText: {},
  solidCard: {
    borderRadius: theme.CARD_BORDER_RADIUS,
    backgroundColor: theme.CARD_FILL_COLOR,
    width: '100%',
  },
  borderCard: {
    borderRadius: theme.CARD_BORDER_RADIUS,
    borderWidth: theme.CARD_BORDER_WIDTH,
    borderColor: theme.CARD_BORDER_COLOR,
    backgroundColor: theme.BACKGROUND_COLOR,
    width: '100%',
  },
  weekHistorySquare: {
    height: 27,
    width: 27,
    borderRadius: 6,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCircle: {
    height: theme.TASK_CIRCLE_HEIGHT,
    width: theme.TASK_CIRCLE_HEIGHT,
    borderRadius: theme.TASK_CIRCLE_HEIGHT / 2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // buttons
  solidButton: {
    height: 60,
    width: '100%',
    backgroundColor: theme.PRIMARY_COLOR,
    alignSelf: 'center',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButton: {
    height: 60,
    width: '100%',
    backgroundColor: theme.BACKGROUND_COLOR,
    alignSelf: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningButton: {
    height: 60,
    width: '100%',
    backgroundColor: theme.BACKGROUND_COLOR,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  solidButtonText: {
    color: theme.BACKGROUND_COLOR,
    fontSize: 24,
    fontWeight: '500',
  },
  outlineButtonText: {
    color: theme.SECONDARY_COLOR,
    fontSize: 24,
    fontWeight: '500',
  },
  warningButtonText: {
    color: theme.LIGHT_VIOLET_COLOR,
    fontSize: 24,
    fontWeight: '500',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
});
