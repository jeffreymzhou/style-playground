import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style';
import commonStyle from '../../../styles/common.style';
export default StyleSheet.create({
  weekHistoryContainer: {
    ...commonStyle.solidCard,
    marginTop: 20,
    marginBottom: 10,
    height: 100,
    flexDirection: 'row',
  },
  weekHistoryColumn: {
    flex: 1,
    height: '100%',
    ...commonStyle.center,
  },
  pastComplete: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
  past: {
    backgroundColor: theme.DARK_GREY_COLOR,
  },
  today: {
    borderWidth: 4,
    borderColor: theme.PRIMARY_COLOR,
  },
  todayComplete: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  future: {
    borderWidth: 2,
    borderColor: theme.DARK_GREY_COLOR,
  },
  dateCube: {
    height: 27,
    width: 27,
    borderRadius: 6,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCubeIcon: {
    color: theme.BACKGROUND_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  todayFont: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_COLOR,
    fontWeight: '700',
  },
  weekHistoryFont: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.DARK_GREY_COLOR,
    fontWeight: '500',
  },
});
