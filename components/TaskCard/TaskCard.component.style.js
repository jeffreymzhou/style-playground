import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style';
import commonStyle from '../../styles/common.style';
export default StyleSheet.create({
  // container

  taskCardContainer: {
    borderRadius: theme.CARD_BORDER_RADIUS + 2,
    marginTop: 7,
    marginBottom: 7,
  },
  taskCard: {
    height: 60,
    flexDirection: 'row',
    ...commonStyle.borderCard,
    borderWidth: 0,
  },

  // content regions

  taskCardLeft: {
    flex: 1,
    ...commonStyle.center,
  },
  taskCardContent: {
    flex: 4,
    justifyContent: 'center',
  },
  taskCardRight: {
    flex: 1,
    ...commonStyle.center,
    height: '100%',
  },

  // task circle

  taskCircle: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    ...commonStyle.center,
  },
  upcoming: {
    borderWidth: theme.CARD_BORDER_WIDTH,
    borderColor: theme.MEDIUM_GREY_COLOR,
  },
  doing: {
    borderWidth: 2,
    borderColor: theme.PRIMARY_COLOR,
  },
  done: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  paused: {
    backgroundColor: theme.MUTED_PRIMARY_COLOR,
  },
  confirmProgress: {
    backgroundColor: theme.MUTED_PRIMARY_COLOR,
  },

  // duration selector
  durationSelectorBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationSelectorButton: {
    flex: 1,
    ...commonStyle.center,
  },
  durationSelectorText: {
    color: 'white',
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  durationSelectorButtonActive: {
    flex: 1,
    ...commonStyle.center,
    height: '55%',
    width: '90%',
    backgroundColor: theme.BACKGROUND_COLOR,
    borderRadius: 6,
  },
  durationSelectorTextActive: {
    color: theme.SECONDARY_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM,
  },

  // text

  selectedDurationText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.SECONDARY_COLOR,
  },
  taskTitleText: {
    color: theme.PRIMARY_TEXT_COLOR,
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: '500',
  },
  taskTitleTextStrikethrough: {
    color: theme.MEDIUM_GREY_COLOR,
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: '400',
    // textDecorationLine: 'line-through',
    // textDecorationStyle: 'solid',
  },
  taskDetailsText: {
    color: theme.PRIMARY_TEXT_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
    fontWeight: '400',
  },

  // icon

  taskCircleIcon: {
    color: theme.BACKGROUND_COLOR,
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: theme.FONT_WEIGHT_HEAVY,
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
});
