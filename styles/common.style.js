import { StyleSheet } from 'react-native';
import theme from './theme.style.js';
export default StyleSheet.create({
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
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
